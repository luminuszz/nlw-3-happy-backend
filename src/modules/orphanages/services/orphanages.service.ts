import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Connection } from 'typeorm'
import { Orphanage } from '../infra/typeorm/entities/orphanage.entity'
import { OrphanageImage } from '../infra/typeorm/entities/orphanageImage.entity'
import { ICreateOrphanageDTO } from '../dtos/CreateOrphanagesDTO'
import { IUploadOrphanagesImagesDTO } from '../dtos/UploadOrphanagesImagesDTO'
import { join } from 'path'

@Injectable()
export class OrphanagesService {
  constructor(
    @InjectRepository(Orphanage)
    private orphanageRepository: Repository<Orphanage>,
    @InjectRepository(OrphanageImage)
    private orphanageImageRepository: Repository<OrphanageImage>,

    private connection: Connection
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
    const response = await this.orphanageRepository.find({
      relations: ['orphanageImages'],
    })

    return response
  }

  public async getOrphanagesById(id: string): Promise<Orphanage> {
    const foundedOrphanage = await this.orphanageRepository.findOne(id, {
      relations: ['orphanageImages'],
    })

    if (!foundedOrphanage) {
      throw new Error('Orphange not found')
    }

    return foundedOrphanage
  }

  public async uploadOrphanagesImages({
    files,
    orphanageId,
  }: IUploadOrphanagesImagesDTO): Promise<void> {
    const queryRunnerTransaction = this.connection.createQueryRunner()
    await queryRunnerTransaction.connect()
    await queryRunnerTransaction.startTransaction()

    try {
      files.forEach(async file => {
        const newImage = queryRunnerTransaction.manager.create<OrphanageImage>(
          OrphanageImage,
          { orphanageId, path: file.fileName }
        )

        await queryRunnerTransaction.manager.save(newImage)
      })
      await queryRunnerTransaction.commitTransaction()
    } catch (error) {
      await queryRunnerTransaction.rollbackTransaction()

      throw new BadRequestException()
    } finally {
      await queryRunnerTransaction.release()
    }
  }
}
