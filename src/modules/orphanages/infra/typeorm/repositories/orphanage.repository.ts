import { ICreateOrphanageDTO } from 'modules/orphanages/dtos/CreateOrphanagesDTO'
import { IUploadOrphanagesImagesDTO } from 'modules/orphanages/dtos/UploadOrphanagesImagesDTO'
import { Orphanage } from 'modules/orphanages/infra/typeorm/entities/orphanage.entity'
import { IOrphanageRepository } from '../../../repositories/IOrphanageRepository'
import { OrphanageImage } from 'modules/orphanages/infra/typeorm/entities/orphanageImage.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Connection, EntityRepository, Repository } from 'typeorm'

@EntityRepository(Orphanage)
export class OrphanageRepository
  extends Repository<Orphanage>
  implements IOrphanageRepository {
  constructor(
    @InjectRepository(Orphanage)
    private orphanageRepository: Repository<Orphanage>,
    @InjectRepository(OrphanageImage)
    private orphanageImageRepository: Repository<OrphanageImage>,

    private connection: Connection
  ) {
    super()
  }

  public async findById(id: string): Promise<Orphanage> {
    const foundedOrphanage = await this.orphanageRepository.findOne(id, {
      relations: ['orphanageImages'],
    })

    return foundedOrphanage
  }

  public async findAll(): Promise<Orphanage[]> {
    const orphanages = await this.orphanageRepository.find({
      relations: ['orphanageImages'],
    })

    return orphanages
  }

  public async createOrphanage(data: ICreateOrphanageDTO): Promise<Orphanage> {
    const newOrphaned = this.orphanageRepository.create(data)

    await this.orphanageRepository.save(newOrphaned)

    return newOrphaned
  }

  public async uploadImages({
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

      throw new Error('Upload falied')
    } finally {
      await queryRunnerTransaction.release()
    }
  }
}
