import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join, resolve } from 'path'
import { AppModule } from './app.module'
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  await app.listen(3000)

  app.use(
    '/files',
    express.static(join(process.cwd(), __dirname, '..', 'temp', 'images'))
  )
}
bootstrap()
