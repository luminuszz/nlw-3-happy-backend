import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'

import { ObjectSchema } from 'yup'

@Injectable()
export class ValidationSchemaPipe<T = unknown> implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  public async transform(value: T, _metaData: ArgumentMetadata): Promise<T> {
    await this.schema.validate(value, {
      abortEarly: false,
    })

    return value
  }
}
