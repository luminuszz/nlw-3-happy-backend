import { ICreateOrphanageDTO } from 'modules/orphanages/dtos/CreateOrphanagesDTO'
import { IUploadOrphanagesImagesDTO } from 'modules/orphanages/dtos/UploadOrphanagesImagesDTO'
import { Orphanage } from 'modules/orphanages/infra/typeorm/entities/orphanage.entity'
import { IOrphanageRepository } from '../IOrphanageRepository'
import { uuid } from 'uuidv4'
import { OrphanageImage } from 'modules/orphanages/infra/typeorm/entities/orphanageImage.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FakeOrphanageRepository implements IOrphanageRepository {
  private orphanages: Orphanage[] = []
  private orphanagesImages: OrphanageImage[] = []

  public async findById(id: string): Promise<Orphanage> {
    const foundedOrphanage = this.orphanages.find(item => item.id === id)

    return foundedOrphanage
  }

  public async findAll(): Promise<Orphanage[]> {
    return this.orphanages
  }

  public async createOrphanage(data: ICreateOrphanageDTO): Promise<Orphanage> {
    const newOrphanage: Orphanage = {} as Orphanage

    Object.assign(newOrphanage, {
      ...data,
      id: uuid(),
    })

    return newOrphanage
  }

  public async uploadImages(values: IUploadOrphanagesImagesDTO): Promise<void> {
    values.files.forEach(item => {
      const images = new OrphanageImage()
      Object.assign(images, {
        id: values.orphanageId,
        path: item.fileName,
      })

      this.orphanagesImages.push(images)
    })
  }
}
