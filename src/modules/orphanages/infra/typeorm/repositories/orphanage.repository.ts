import { ICreateOrphanageDTO } from 'modules/orphanages/dtos/CreateOrphanagesDTO'
import { Orphanage } from 'modules/orphanages/infra/typeorm/entities/orphanage.entity'
import { IOrphanageRepository } from '../../../repositories/IOrphanageRepository'
import { Injectable } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Orphanage)
@Injectable()
export class OrphanageRepository
  extends Repository<Orphanage>
  implements IOrphanageRepository {
  constructor() {
    super()
  }

  public async findById(id: string): Promise<Orphanage> {
    const foundedOrphanage = await this.findOne(id, {
      relations: ['orphanageImages'],
    })

    return foundedOrphanage
  }

  public async findAll(): Promise<Orphanage[]> {
    const orphanages = await this.find({
      relations: ['orphanageImages'],
    })

    return orphanages
  }

  public async createOrphanage({
    about,
    instructions,
    latitude,
    longitude,
    name,
    openHours,
    openOnWeekends,
  }: ICreateOrphanageDTO): Promise<Orphanage> {
    const newOrphaned = this.create({
      about,
      instructions,
      latitude,
      longitude,
      name,
      openHours,
      openOnWeekends,
    })

    await this.save(newOrphaned)

    return newOrphaned
  }
}
