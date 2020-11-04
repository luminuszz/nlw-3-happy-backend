import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { OrphanagesModule } from './modules/orphanages/orphanages.module'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
    }),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot(),
    OrphanagesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
