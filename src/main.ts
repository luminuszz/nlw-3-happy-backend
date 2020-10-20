import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { AppModule } from './app.module'
import * as express from 'express'
import { HttpExceptionFilter } from './shared/errors/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  // app.useGlobalFilters(new HttpExceptionFilter())
  app.use(
    '/files',
    express.static(join(process.cwd(), __dirname, '..', 'temp', 'images'))
  )
  app.enableCors()
  await app.listen(process.env.PORT)
}
bootstrap()
