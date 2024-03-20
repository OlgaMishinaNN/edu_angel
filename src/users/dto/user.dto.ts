import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';
import { Expose } from 'class-transformer';

export class UserDto {
  @ApiProperty({
    name: 'id',
    type: String,
    description: 'The id of the user',
  })
  id!: string;

  @ApiProperty({
    name: 'email',
    type: String,
    description: 'The email of the user',
  })
  @IsString()
  @IsEmail()
  email!: string;

  @ApiProperty({
    name: 'first_name',
    type: String,
    description: 'The first name of the user',
  })
  @IsString()
  @Expose({ name: 'first_name' })
  firstName!: string;

  @ApiProperty({
    name: 'last_name',
    type: String,
    description: 'The last name of the user',
  })
  @IsString()
  @Expose({ name: 'last_name' })
  lastName!: string;

  @ApiProperty({
    name: 'created_at',
    type: String,
    description: 'Creation timestamp',
  })
  @Expose({ name: 'created_at' })
  createdAt!: Date;

  @ApiProperty({
    name: 'deleted_at',
    type: String,
    description: 'Deletion timestamp',
  })
  @Expose({ name: 'deleted_at' })
  deletedAt?: Date;
}
