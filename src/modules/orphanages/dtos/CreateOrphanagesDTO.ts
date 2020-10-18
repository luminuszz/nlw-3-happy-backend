import { IsString, IsNumber, IsBoolean } from 'class-validator'

export class ICreateOrphanageDTO {
  @IsString()
  name: string

  @IsString()
  latitude: number

  @IsString()
  longitude: number

  @IsString()
  about: string

  @IsString()
  instructions: string

  @IsString()
  openHours: string

  @IsString()
  openOnWeekends: string
}
