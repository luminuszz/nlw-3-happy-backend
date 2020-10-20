/* implements Methods */

// findById
// create
// findAll
// uploadImages

import { Orphanage } from '../infra/typeorm/entities/orphanage.entity'

import { ICreateOrphanageDTO } from '../dtos/CreateOrphanagesDTO'

export interface IOrphanageRepository {
  findById(id: string): Promise<Orphanage | undefined>
  findAll(): Promise<Orphanage[]>
  createOrphanage(data: ICreateOrphanageDTO): Promise<Orphanage>
}
