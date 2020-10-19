import { OrphanagesController } from './orphanages.controller'
import { OrphanagesService } from '../../../services/orphanages.service'
import { Test } from '@nestjs/testing'

describe('Test OrphanagesController', () => {
  let orphanagesController: OrphanagesController
  let orphanagesService: OrphanagesService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OrphanagesController],
      providers: [OrphanagesService],
    }).compile()

    orphanagesController = moduleRef.get<OrphanagesController>(
      OrphanagesController
    )
    orphanagesService = moduleRef.get<OrphanagesService>(OrphanagesService)
  })

  it('method:createOrphanage, it should be able to create a new orphanage', () => {})
})
