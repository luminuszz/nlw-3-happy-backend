import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { OrphanagesModule } from '../src/modules/orphanages/orphanages.module'
import { OrphanagesService } from '../src/modules/orphanages/services/orphanages.service'
import { INestApplication } from '@nestjs/common'

describe('OrphanageService', () => {
  let app: INestApplication

  const catsService = {
    createOrphanages: () => ['test'],
    getAllOrphanages: () => ['test'],
    getOrphanagesById: () => ['test'],
    uploadOrphanagesImages: () => ['test'],
  }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [OrphanagesModule],
      providers: [],
    })
      .overrideProvider(OrphanagesService)
      .useValue(catsService)
      .compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  it('/get orphanages', () => {
    return request(app.getHttpServer())
      .get('/orphanages')
      .expect(200)
      .expect({ data: catsService.getAllOrphanages() })
  })

  afterAll(async () => {
    await app.close()
  })
})
