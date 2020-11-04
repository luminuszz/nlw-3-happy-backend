import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Res,
} from '@nestjs/common'
import { join } from 'path'
import { Response } from 'express'
import * as fs from 'fs'

@Controller()
export class AppController {
  @Get('files/:slug')
  public async getStaticFiles(
    @Param('slug') slug: string,
    @Res() res: Response
  ): Promise<void> {
    const currentPath = join(__dirname, '..', 'temp', 'images', slug)

    const foundedPath = await fs.promises.readFile(currentPath)

    if (!foundedPath) {
      throw new BadRequestException('this file not exists')
    }

    return res.sendFile(currentPath)
  }
}
