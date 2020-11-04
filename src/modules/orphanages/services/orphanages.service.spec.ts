import { OrphanagesService } from './orphanages.service'
import { Test } from '@nestjs/testing'
import { Orphanage } from '../infra/typeorm/entities/orphanage.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { OrphanageImage } from '../infra/typeorm/entities/orphanageImage.entity'
import { Connection } from 'typeorm'
import TestUtil from '../../../shared/utils/helpers/testUtils'

describe('Test OrphanagesService', () => {
  let orphanagesService: OrphanagesService

  const mockOrphanageRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneOrFail: jest.fn(),
  }
  const mockOrphanageImageRepository = {
    create: jest.fn(),
    save: jest.fn(),
  }
  const mockConnection = {
    createQueryRunner: jest.fn(),
    connect: jest.fn(),
    queryRunner: jest.fn(),
    startTransaction: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        OrphanagesService,
        {
          provide: getRepositoryToken(Orphanage),
          useValue: mockOrphanageRepository,
        },
        {
          provide: getRepositoryToken(OrphanageImage),
          useValue: mockOrphanageImageRepository,
        },
        {
          provide: Connection,
          useValue: mockConnection,
        },
      ],
    }).compile()

    orphanagesService = moduleRef.get<OrphanagesService>(OrphanagesService)
  })

  describe('method:createOrphanages', () => {
    it('should be able to create a new orphanage', async () => {
      const user = TestUtil.returnValidUser()

      mockOrphanageRepository.create.mockReturnValue(user)
      mockOrphanageRepository.save.mockReturnValue(user)

      const newUser = await orphanagesService.createOrphanages(user)

      expect(newUser).toHaveProperty('id')
    })
  })

  describe('method:getAllOrphanages', () => {
    it('should be able to get all orphanages', async () => {
      const validOrphanage = TestUtil.returnValidUser()

      mockOrphanageRepository.find.mockReturnValue([
        validOrphanage,
        validOrphanage,
      ])

      const orphanages = await orphanagesService.getAllOrphanages()

      expect(orphanages).toHaveLength(2)
      expect(orphanages).toEqual([validOrphanage, validOrphanage])
    })
  })

  describe('method:getOrphanageById', () => {
    it('should be able to find orphanage by id', async () => {
      const validOrphanage = TestUtil.returnValidUser()

      mockOrphanageRepository.findOneOrFail.mockReturnValue(validOrphanage)

      const orphanage = await orphanagesService.getOrphanagesById(
        validOrphanage.id
      )

      expect(orphanage.id).toEqual(validOrphanage.id)
    })

    it('should not be able to find orphanage with not have valid id', async () => {
      const validOrphanage = TestUtil.returnValidUser()

      mockOrphanageRepository.findOneOrFail.mockReturnValue(undefined)

      await expect(
        orphanagesService.getOrphanagesById(validOrphanage.id)
      ).rejects.toBeInstanceOf(Error)
    })
  })
})
