import { OrphanagesService } from './orphanages.service'
import { Test } from '@nestjs/testing'
import { Orphanage } from '../infra/typeorm/entities/orphanage.entity'

import { FakeOrphanageRepository } from '../../orphanages/repositories/fakes/FakeOrphangeRepository'

describe('Test OrphanagesController', () => {
  let orphanagesService: OrphanagesService
  let fakeOrphangeRepository: FakeOrphanageRepository

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [OrphanagesService, FakeOrphanageRepository],
    }).compile()

    orphanagesService = moduleRef.get<OrphanagesService>(OrphanagesService)
  })

  it('method:createOrphanage, it should be able to create a new orphanage', async () => {
    const data = {
      about: 'sad',
      instructions: 'sad',
      id: 'da',
      latitude: 4544,
      longitude: 545,
      openHours: '454',
      openOnWeekends: 'true',
      name: 'teste',
    }

    const newOrphange = await orphanagesService.createOrphanages({ ...data })

    expect(newOrphange).toHaveProperty('id')
  })
})
