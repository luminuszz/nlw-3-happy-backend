import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrphanagesController } from './infra/http/orphanages.controller'
import { OrphanagesService } from './services/orphanages.service'
import { Orphanage } from './infra/typeorm/entities/orphanage.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Orphanage])],
  controllers: [OrphanagesController],
  providers: [OrphanagesService],
})
export class OrphanagesModule {}
