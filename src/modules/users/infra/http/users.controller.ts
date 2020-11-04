import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'modules/auth/guards/jwt-auth.guard'
import { createUserDTO } from 'modules/users/dtos/createUserDTO'
import { UsersService } from 'modules/users/users.service'
import { User } from '../typeorm/entities/user.entity'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  public async createUser(@Body() data: createUserDTO): Promise<User> {
    try {
      const newUser = await this.usersService.createUser(data)

      return newUser
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async findUserById(
    @Param('id', new ParseUUIDPipe()) id: string
  ): Promise<User> {
    try {
      const currentUser = await this.usersService.findUserById(id)

      return currentUser
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getAllUser(): Promise<User[]> {
    try {
      const users = await this.usersService.getAllUsers()

      return users
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
}
