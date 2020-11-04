import { Resolver, Query } from '@nestjs/graphql'
import { Orphanage } from '../models/Orphanage.model'
import { OrphanagesService } from './orphanages.service'

@Resolver(of => Orphanage)
export class OrphanageResolver {
  constructor(private orphanageService: OrphanagesService) {}

  @Query(returns => [Orphanage])
  public async getOrphaneges(): Promise<Orphanage[]> {
    const orphanages = await this.orphanageService.getAllOrphanages()

    return orphanages
  }
}
