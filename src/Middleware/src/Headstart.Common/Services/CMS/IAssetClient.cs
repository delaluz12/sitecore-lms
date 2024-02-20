using Headstart.Common.Extensions;
using Headstart.Common.Services.CMS.Models;
using Headstart.Models;
using ordercloud.integrations.library;
using SendGrid.Helpers.Mail;
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Threading.Tasks;

namespace Headstart.Common.Services.CMS
{
    public interface IAssetClient
    {
        Task<ImageAsset> CreateImage(AssetUpload asset);
        Task DeleteAsset(string id);
        Task<Attachment> GetAssetByName(string fileName);
        Task<DocumentAsset> CreateDocument(AssetUpload asset);
        Task DeleteAssetByUrl(string assetUrl);
    }

    public class AssetClient : IAssetClient
    {
        private readonly IOrderCloudIntegrationsBlobService _blob;
        private readonly AppSettings _settings;
        
        private const string uploadContainer = "po-uploads";

        public AssetClient(IOrderCloudIntegrationsBlobService blob, AppSettings settings)
        {
            _blob = blob;
            _settings = settings;
        }

        public async Task<ImageAsset> CreateImage(AssetUpload asset)
        {
            var container = _blob.Container.Name;
            var assetGuid = Guid.NewGuid().ToString();

            using(var image = Image.FromStream(asset.File.OpenReadStream()))
            {
                var small = image.ResizeSmallerDimensionToTarget(100);
                var medium = image.ResizeSmallerDimensionToTarget(300);
                await Task.WhenAll(new[] {
                    _blob.Save(assetGuid, medium.ToBytes(ImageFormat.Png), "image/png"),
                    _blob.Save($"{assetGuid}-s", small.ToBytes(ImageFormat.Png), "image/png")
                }); 
            }
            return new ImageAsset
            {
                Url = $"{GetBaseUrl()}{container}/{assetGuid}",
                ThumbnailUrl = $"{GetBaseUrl()}{container}/{assetGuid}-s"
            };
        }

        public async Task<DocumentAsset> CreateDocument(AssetUpload asset)
        {
            var container = uploadContainer;
            var assetGuid = Guid.NewGuid().ToString(); //change here if you want to name the file something else other than GUID
            await _blob.Save(assetGuid, asset.File, "application/pdf");
            return new DocumentAsset()
            {
                FileName = asset.Filename,
                Url = $"{GetBaseUrl()}{container}/{assetGuid}"
            };
        }

        public async Task DeleteAsset(string id)
        {
            await _blob.Delete(id);
            try
            {
                await _blob.Delete($"{id}-s");
            } catch { }
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

        public async Task DeleteAssetByUrl(string assetUrl)
        {
            var id = GetAssetIDFromUrl(assetUrl);
            await _blob.Delete(id);
            try
            {
                await _blob.Delete($"{id}-s");
            }
            catch { }
        }

        public string GetAssetIDFromUrl(string url)
        {
            var parts = url.Split("/");
            return parts[parts.Length - 1];
        }

        private string GetBaseUrl()
        {
            return _settings.StorageAccountSettings.BlobPrimaryEndpoint.EndsWith("/") ? _settings.StorageAccountSettings.BlobPrimaryEndpoint : _settings.StorageAccountSettings.BlobPrimaryEndpoint + "/";
        } 
    }
}
