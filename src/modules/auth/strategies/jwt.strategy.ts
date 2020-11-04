import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { jwtConstansts } from 'config/contants'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PayloadDTO } from '../dtos/payloadDTO'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstansts.secret,
    })
  }

  public async validate(payload: PayloadDTO): Promise<PayloadDTO> {
    if (!payload) {
      throw new UnauthorizedException('token not found')
    }

    return payload
  }
}
