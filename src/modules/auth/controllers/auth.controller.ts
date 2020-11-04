import { Request, Controller, Post, UseGuards } from '@nestjs/common'
import { Request as ExpressRequest } from 'express'
import { User } from 'modules/users/infra/typeorm/entities/user.entity'
import { LocalAuthGuard } from '../guards/local-auth.guard'
import { AuthService } from '../services/auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(
    @Request() req: ExpressRequest
  ): Promise<ExpressRequest['user']> {
    return this.authService.login(req.user as User)
  }
}
