interface Files {
  fileName: string
  path: string
}

export interface IUploadOrphanagesImagesDTO {
  files: Files[]
  orphanageId: string
}
