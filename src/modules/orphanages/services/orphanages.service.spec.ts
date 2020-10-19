import { OrphanagesService } from './orphanages.service'
import { Test } from '@nestjs/testing'
import { Orphanage } from '../infra/typeorm/entities/orphanage.entity'

import { FakeOrphanageRepository } from '../../orphanages/repositories/fakes/FakeOrphangeRepository'

describe('Test OrphanagesController', () => {
  let orphanagesService: OrphanagesService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [OrphanagesService, FakeOrphanageRepository],
    }).compile()

    orphanagesService = moduleRef.get<OrphanagesService>(OrphanagesService)
  })

  it('method:createOrphanage, it should be able to create a new orphanage', async () => {
    const newOrphange = await orphanagesService.createOrphanages(data)
  })
})
