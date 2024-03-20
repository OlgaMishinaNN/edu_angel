import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, Min, IsNumber, Max, IsOptional } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { SortOrder, SortParam } from '../enums/sort.enum';
import { ToBoolean } from '../decorators/to-boolean.decorator';

export class QueryDto {
  @ApiProperty({
    name: 'limit',
    type: Number,
    description: 'The maximum number of users in the response',
    nullable: true,
    default: 25,
  })
  @IsNumber()
  @Max(100)
  @Min(1)
  @Expose()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 25;

  @ApiProperty({
    name: 'offset',
    type: Number,
    description: 'The number of users to skip before adding to the response',
    nullable: true,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  @Expose()
  @IsOptional()
  @Type(() => Number)
  offset?: number = 0;

  @ApiProperty({
    name: 'sort',
    description: 'Sorting parameter',
    nullable: true,
    enum: SortParam,
    default: SortParam.Id,
  })
  @IsEnum(SortParam)
  @Expose()
  @IsOptional()
  sort?: SortParam = SortParam.Id;

  @ApiProperty({
    name: 'order',
    description: 'Sorting order: ascending or descending',
    nullable: true,
    enum: SortOrder,
    default: SortOrder.Asc,
  })
  @IsEnum(SortOrder)
  @Expose()
  @IsOptional()
  order?: SortOrder = SortOrder.Asc;

  @ApiProperty({
    name: 'show_deleted',
    type: Boolean,
    description: 'Flag to indicate if the deleted entities shall be returned',
    nullable: true,
    default: false,
  })
  @Expose({ name: 'show_deleted' })
  @IsOptional()
  @ToBoolean()
  showDeleted?: boolean = false;
}
