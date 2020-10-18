import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrphanagesController } from './infra/http/controllers/orphanages.controller'
import { OrphanagesService } from './services/orphanages.service'
import { Orphanage } from './infra/typeorm/entities/orphanage.entity'
import { OrphanageImage } from './infra/typeorm/entities/orphanageImage.entity'
import { MulterModule } from '@nestjs/platform-express'

@Module({
  imports: [
    TypeOrmModule.forFeature([Orphanage, OrphanageImage]),
    MulterModule.register({
      dest: './temp/images',
    }),
  ],
  controllers: [OrphanagesController],
  providers: [OrphanagesService],
})
export class OrphanagesModule {}
