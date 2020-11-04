import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { User } from 'modules/users/infra/typeorm/entities/user.entity'
import { Strategy } from 'passport-local'
import { AuthService } from '../services/auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' })
  }

  public async validate(email: string, password: string): Promise<User> {
    const validatedUser = await this.authService.ValidateUser({
      email,
      password,
    })

    if (!validatedUser) {
      throw new UnauthorizedException('credentials incorrect')
    }

    return validatedUser
  }
}
