import { IsString, IsEmail, IsNotEmpty } from 'class-validator'

export class createUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  phoneNumber?: string
}
