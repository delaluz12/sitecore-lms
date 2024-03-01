import httpClient from '../utils/HttpClient'
import { AssetUpload } from '../models/AssetUpload'
import { RequiredDeep } from '../models/RequiredDeep'
import { DocumentAsset, FileData, ImageAsset } from '../models/Asset'

export default class Upload {
  constructor() {
    this.UploadImage = this.UploadImage.bind(this)
    this.UploadDocument = this.UploadDocument.bind(this)
    this.DeleteAsset = this.DeleteAsset.bind(this)
    this.UploadPO = this.UploadPO.bind(this)
  }

  async UploadImage(
    asset: AssetUpload,
    accessToken?: string
  ): Promise<RequiredDeep<ImageAsset>> {
    const form = new FormData()
    for (const prop in asset) {
      if (asset.hasOwnProperty(prop)) {
        form.append(prop, asset[prop])
      }
    }
    return await httpClient.post(`/assets/image`, form, { params: { accessToken } })
  }

  async UploadDocument(
    asset: AssetUpload,
    accessToken?: string
  ): Promise<RequiredDeep<ImageAsset>> {
    const form = new FormData()
    for (const prop in asset) {
      if (asset.hasOwnProperty(prop)) {
        form.append(prop, asset[prop])
      }
    }
    return await httpClient.post(`/assets/document`, form, {
      params: { accessToken },
    })
  }

  async UploadPO(asset: FileData): Promise<RequiredDeep<DocumentAsset>> {
    return await httpClient.post(
      `/assets/po-uploads`,
      this.mapFileToFormData(asset),
      {
        params: {},
      }
    )
  }

 async DeleteAsset(
    assetID: string,
    accessToken?: string
  ): Promise<RequiredDeep<ImageAsset>> {
    return await httpClient.delete(`/assets/${assetID}}`, { params: { accessToken } })
  }

  private mapFileToFormData(file: FileData) {
    const data = new FormData()
    Object.keys(file).forEach(key => {
        data.append(key, file[key])
    })
    return data;
}
}
