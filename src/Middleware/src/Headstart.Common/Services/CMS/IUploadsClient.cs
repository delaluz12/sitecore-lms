using Headstart.Common;
using Headstart.Common.Services.CMS.Models;
using Headstart.Models;
using Microsoft.WindowsAzure.Storage.Blob;
using ordercloud.integrations.library;
using System;
using System.Threading.Tasks;
using SendGrid.Helpers.Mail;

namespace Headstart.Common.Services.CMS
{
    public interface IUploadsClient
    {
        Task<DocumentAsset> CreateUpload(AssetUpload asset);
        Task<Attachment> GetAssetByName(string fileName);
        Task<string> GetUploadUrlAsync(string id);
        Task<string> GetSharedAccessSignature(string id);
    }
    public class UploadsClient : IUploadsClient
    {
        private readonly IOrderCloudIntegrationsBlobService _blob;
        private readonly AppSettings _settings;

        public UploadsClient(IOrderCloudIntegrationsBlobService blob, AppSettings settings)
        {
            _blob = blob;
            _settings = settings;
        }

        public async Task<Attachment> GetAssetByName(string assetName)
        {
            try
            {
                var blockBlob = await _blob.GetBlobReference(assetName);

                await blockBlob.FetchAttributesAsync();
                long fileByteLength = blockBlob.Properties.Length;
                byte[] fileContent = new byte[fileByteLength];

                await blockBlob.DownloadToByteArrayAsync(fileContent, 0);

                return new Attachment
                {
                    Filename = assetName,
                    Content = Convert.ToBase64String(fileContent),
                    Type = "application/pdf",
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching blob from Azure Storage: {ex.Message}");
                return null;
            }
        }

        public async Task<DocumentAsset> CreateUpload(AssetUpload asset)
        {
            var container = _blob.Container.Name;
            var assetGuid = Guid.NewGuid().ToString(); //change here if you want to name the file something else other than GUID
            await _blob.Save(assetGuid, asset.File, "application/pdf");
            return new DocumentAsset()
            {
                FileName = asset.Filename,
                Url = $"{GetBaseUrl()}{container}/{assetGuid}"
            };
        }

        public async Task<string> GetUploadUrlAsync(string fileId)
        {
            var container = _blob.Container.Name;
            var sharedAccessSignature = await GetSharedAccessSignature(fileId);
            var url = $"{GetBaseUrl()}{container}/{fileId}{sharedAccessSignature}";
            return url;
        }
        public async Task<string> GetSharedAccessSignature(string fileName)
        {
            var fileReference = await _blob.GetBlobReference(fileName);
            var sharedAccessPolicy = new SharedAccessBlobPolicy()
            {
                SharedAccessStartTime = DateTimeOffset.UtcNow.AddMinutes(-5),
                SharedAccessExpiryTime = DateTimeOffset.UtcNow.AddMinutes(20),
                Permissions = SharedAccessBlobPermissions.Read
            };
            return fileReference.GetSharedAccessSignature(sharedAccessPolicy);
        }

        private string GetBaseUrl()
        {
            return _settings.StorageAccountSettings.BlobPrimaryEndpoint.EndsWith("/") ? _settings.StorageAccountSettings.BlobPrimaryEndpoint : _settings.StorageAccountSettings.BlobPrimaryEndpoint + "/";
        }

        public async Task DeleteAsset(string id)
        {
            await _blob.Delete(id);
            try
            {
                await _blob.Delete($"{id}-s");
            }
            catch { }
        }
    }
}