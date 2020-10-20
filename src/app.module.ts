import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { OrphanagesModule } from './modules/orphanages/orphanages.module'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from 'shared/errors/http-exception.filter'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
    }),
    TypeOrmModule.forRoot(),
    OrphanagesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /* { provide: APP_FILTER, useClass: HttpExceptionFilter }, */
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
