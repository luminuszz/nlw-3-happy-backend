import { IUploadOrphanagesImagesDTO } from '../dtos/UploadOrphanagesImagesDTO'

export interface SaveImagesParamsDTO {
  file: File
  orphanageId: string
}

export interface IOrphanageImage {
  uploadImages(data: IUploadOrphanagesImagesDTO): Promise<void>
}
