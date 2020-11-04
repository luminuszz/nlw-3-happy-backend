import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { createUserDTO } from './dtos/createUserDTO'
import { User } from './infra/typeorm/entities/user.entity'
import { hash } from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  public async createUser({
    email,
    name,
    password,
    phoneNumber,
  }: createUserDTO): Promise<User> {
    const hashPassword = await hash(password, 10)

    const newUser = this.usersRepository.create({
      email,
      name,
      password: hashPassword,
      phoneNumber,
    })

    await this.usersRepository.save(newUser)

    return newUser
  }

  public async findUserById(id: string): Promise<User | undefined> {
    const currentUser = await this.usersRepository.findOneOrFail(id)

    if (!currentUser) {
      throw new Error('user not Found')
    }

    return currentUser
  }

  public async findUserByEmail(email: string): Promise<User | undefined> {
    const currentUser = await this.usersRepository.findOne({ where: { email } })

    if (!currentUser) {
      throw new Error('user not Found')
    }

    return currentUser
  }

  public async getAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.find()

    return users
  }
}
