import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { AppModule } from './app.module'
import * as express from 'express'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  // app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe())
  app.use(
    '/files',
    express.static(join(process.cwd(), __dirname, '..', 'temp', 'images'))
  )
  app.enableCors()

  await app.listen(4000)
}
bootstrap()
