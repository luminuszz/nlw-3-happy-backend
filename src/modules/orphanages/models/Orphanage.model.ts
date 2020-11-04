import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Orphanage {
  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field()
  latitude: number

  @Field()
  longitude: number

  @Field()
  about: string

  @Field()
  instructions: string

  @Field()
  openHours: string

  @Field()
  openOnWeekends: string

  @Field({ name: 'created_at' })
  createdAt: Date

  @Field({ name: 'updated_at' })
  updatedAt: Date
}
