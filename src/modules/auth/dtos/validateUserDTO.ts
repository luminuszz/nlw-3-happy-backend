import { IsNotEmpty, IsString } from 'class-validator'

export class ValidateUserDTO {
  @IsNotEmpty()
  @IsString()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}
