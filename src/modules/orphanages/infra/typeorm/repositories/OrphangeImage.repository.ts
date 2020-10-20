import { Injectable } from '@nestjs/common'
import { IUploadOrphanagesImagesDTO } from 'modules/orphanages/dtos/UploadOrphanagesImagesDTO'
import { OrphanageImage } from 'modules/orphanages/infra/typeorm/entities/orphanageImage.entity'
import { IOrphanageImage } from 'modules/orphanages/repositories/IOrphangeImage.repositry'
import { EntityRepository, Repository, getConnection } from 'typeorm'

@EntityRepository(OrphanageImage)
@Injectable()
export class OrphanagesImageRepository
  extends Repository<OrphanageImage>
  implements IOrphanageImage {
  constructor() {
    super()
  }

  public async uploadImages({
    files,
    orphanageId,
  }: IUploadOrphanagesImagesDTO): Promise<void> {
    const queryRunner = getConnection().createQueryRunner()

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
