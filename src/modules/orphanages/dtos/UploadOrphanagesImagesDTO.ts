export interface File {
  fileName: string
  path: string
}

export interface IUploadOrphanagesImagesDTO {
  files: File[]
  orphanageId: string
}
export interface IUploadOrphanagesImageDTO {
  files: File
  orphanageId: string
}
