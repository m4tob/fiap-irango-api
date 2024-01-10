import { ApiProperty } from '@nestjs/swagger'

import { IsDefined } from 'class-validator'

export default class Paginated<T> {
  @IsDefined()
  @ApiProperty({ description: 'Paginated results', required: false, type: [Object] })
  results: T[]

  @IsDefined()
  @ApiProperty({ description: 'Total results', required: false, example: 42 })
  total: number

  @IsDefined()
  @ApiProperty({ description: 'Current page', required: false, example: 1 })
  page: number

  @IsDefined()
  @ApiProperty({ description: 'Results per page', required: false, example: 10 })
  pageSize: number
}
