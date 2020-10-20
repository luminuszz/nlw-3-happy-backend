import { IUploadOrphanagesImagesDTO } from 'modules/orphanages/dtos/UploadOrphanagesImagesDTO'
import { OrphanageImage } from 'modules/orphanages/infra/typeorm/entities/orphanageImage.entity'
import { IOrphanageImage } from '../IOrphangeImage.repositry'

export class FakeOrphangeImageRepository implements IOrphanageImage {
  private Images: OrphanageImage[] = []

  public async uploadImages({
    files,
    orphanageId,
  }: IUploadOrphanagesImagesDTO): Promise<void> {
    files.map(file => {
      const newImage = new OrphanageImage()

      Object.assign(newImage, { id: orphanageId, path: file.fileName })

      this.Images.push(newImage)
    })
  }
}
