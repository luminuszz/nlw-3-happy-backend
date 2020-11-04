/* eslint-disable camelcase */
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'modules/users/users.service'
import { ValidateUserDTO } from '../dtos/validateUserDTO'
import * as bcrypt from 'bcrypt'
import { User } from 'modules/users/infra/typeorm/entities/user.entity'
import { PayloadDTO } from '../dtos/payloadDTO'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  public async ValidateUser({
    email,
    password: currentPassword,
  }: ValidateUserDTO): Promise<User | null> {
    const currentUser = await this.userService.findUserByEmail(email)

    if (!currentUser) {
      return null
    }
    const compare = await bcrypt.compare(currentPassword, currentUser.password)

    if (!compare) {
      return null
    }

    return currentUser
  }

  public async login(user: User): Promise<{ access_token: string }> {
    const payload: PayloadDTO = {
      name: user.name,
      id: user.id,
      email: user.email,
    }

    const access_token = await this.jwtService.signAsync(payload)

    return {
      access_token,
    }
  }
}
