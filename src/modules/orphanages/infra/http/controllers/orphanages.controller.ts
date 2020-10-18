import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { OrphanagesService } from '../../../services/orphanages.service'
import { Orphanage } from '../../typeorm/entities/orphanage.entity'
import { ICreateOrphanageDTO } from '../../../dtos/CreateOrphanagesDTO'
import {
  editFileName,
  imageFileFilter,
} from '../../../../../shared/utils/fileFormatet.utils'
import { ValidationPipe } from '../../../../../shared/pipes/ClassValidate..pipe'
import { ValidationSchemaPipe } from '../../../../../shared/pipes/SchemaValidate.pipe'
import { getSinglById } from '../validators/getSinglById.validate'
import { AnyFilesInterceptor } from '@nestjs/platform-express'

import { diskStorage } from 'multer'

@Controller('orphanages')
export class OrphanagesController {
  constructor(protected readonly orphanagesService: OrphanagesService) {}

  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './temp/images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  public async createOrphanage(
    @UploadedFiles() files: Express.Multer.File[],
    @Body(new ValidationPipe()) data: ICreateOrphanageDTO
  ): Promise<Orphanage> {
    const {
      about,
      instructions,
      latitude,
      longitude,
      name,
      openHours,
      openOnWeekends,
    } = data

    try {
      const newOrphanage = await this.orphanagesService.createOrphanages({
        about,
        instructions,
        latitude,
        longitude,
        name,
        openHours,
        openOnWeekends,
      })

      const filesData = files.map(file => ({
        fileName: file.filename,
        path: file.path,
      }))

      await this.orphanagesService.uploadOrphanagesImages({
        files: filesData,
        orphanageId: newOrphanage.id,
      })

      return newOrphanage
    } catch (error) {
      throw new BadRequestException()
    }
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  public async getAllOrphanages(): Promise<Orphanage[]> {
    const orphanages = await this.orphanagesService.getAllOrphanages()

    return orphanages
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  public async getOrphanageById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<Orphanage> {
    try {
      const foundedOrphanage = await this.orphanagesService.getOrphanagesById(
        id
      )
      return foundedOrphanage
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
