import { Injectable } from '@nestjs/common'
import { Orphanage } from '../infra/typeorm/entities/orphanage.entity'
import { ICreateOrphanageDTO } from '../dtos/CreateOrphanagesDTO'
import { IUploadOrphanagesImagesDTO } from '../dtos/UploadOrphanagesImagesDTO'
import { OrphanageRepository } from '../infra/typeorm/repositories/orphanage.repository'

@Injectable()
export class OrphanagesService {
  constructor(private orphanageRepository: OrphanageRepository) {}

  public async createOrphanages({
    about,
    instructions,
    latitude,
    longitude,
    name,
    openHours,
    openOnWeekends,
  }: ICreateOrphanageDTO): Promise<Orphanage> {
    const newOrphanages = this.orphanageRepository.create({
      about,
      instructions,
      latitude,
      longitude,
      name,
      openHours,
      openOnWeekends,
    })

    return newOrphanages
  }

  public async getAllOrphanages(): Promise<Orphanage[]> {
    const response = await this.orphanageRepository.findAll()

    return response
  }

  public async getOrphanagesById(id: string): Promise<Orphanage> {
    const foundedOrphanage = await this.orphanageRepository.findById(id)

    if (!foundedOrphanage) {
      throw new Error('Orphange not found')
    }

    return foundedOrphanage
  }

  public async uploadOrphanagesImages({
    files,
    orphanageId,
  }: IUploadOrphanagesImagesDTO): Promise<void> {
    await this.orphanageRepository.uploadImages({ files, orphanageId })
  }
}
