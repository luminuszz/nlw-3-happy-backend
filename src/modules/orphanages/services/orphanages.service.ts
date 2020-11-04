import { Injectable } from '@nestjs/common'
import { Orphanage } from '../infra/typeorm/entities/orphanage.entity'
import { ICreateOrphanageDTO } from '../dtos/CreateOrphanagesDTO'
import { IUploadOrphanagesImagesDTO } from '../dtos/UploadOrphanagesImagesDTO'
import { InjectRepository } from '@nestjs/typeorm'
import { Connection, Repository } from 'typeorm'
import { OrphanageImage } from '../infra/typeorm/entities/orphanageImage.entity'

@Injectable()
export class OrphanagesService {
  constructor(
    @InjectRepository(Orphanage)
    private readonly orphanageRepository: Repository<Orphanage>,

    @InjectRepository(OrphanageImage)
    private readonly orphanagesImageRepository: Repository<OrphanageImage>,

    private readonly connection: Connection
  ) {}

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

    await this.orphanageRepository.save(newOrphanages)

    return newOrphanages
  }

  public async getAllOrphanages(): Promise<Orphanage[]> {
    const response = await this.orphanageRepository.find()

    return response
  }

  public async getOrphanagesById(id: string): Promise<Orphanage> {
    const foundedOrphanage = await this.orphanageRepository.findOneOrFail(id)

    if (!foundedOrphanage) {
      throw new Error('Orphange not found')
    }

    return foundedOrphanage
  }

  public async uploadOrphanagesImages({
    files,
    orphanageId,
  }: IUploadOrphanagesImagesDTO): Promise<void> {
    const queryRunner = this.connection.createQueryRunner()

    await queryRunner.connect()

    await queryRunner.startTransaction()

    try {
      files.forEach(async image => {
        const newImage = queryRunner.manager.create<OrphanageImage>(
          OrphanageImage,
          {
            orphanageId,
            path: image.fileName,
          }
        )

        await queryRunner.manager.save(OrphanageImage, newImage)
      })

      await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }
}
