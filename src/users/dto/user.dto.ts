import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';
import { Expose } from 'class-transformer';

export class UserDto {
  @ApiProperty({
    type: String,
    description: 'The id of the user',
    nullable: false,
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'The email of the user',
    nullable: false,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'The first name of the user',
    nullable: false,
  })
  @IsString()
  @Expose({ name: 'first_name' })
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'The last name of the user',
    nullable: false,
  })
  @IsString()
  @Expose({ name: 'last_name' })
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'Creation timestamp',
    nullable: false,
  })
  @Expose({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    type: String,
    description: 'Deletion timestamp',
    nullable: true,
  })
  @Expose({ name: 'deleted_at' })
  deletedAt: Date;
}
