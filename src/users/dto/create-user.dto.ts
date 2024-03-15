import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    name: 'email',
    type: String,
    description: 'The email of the user',
    nullable: false,
  })
  @IsEmail()
  @MaxLength(255, {
    message: 'Email is too long',
  })
  email!: string;

  @ApiProperty({
    name: 'first_name',
    type: String,
    description: 'The first name of the user',
    nullable: false,
  })
  @IsString()
  @MaxLength(100, {
    message: 'First name is too long',
  })
  @Expose({ name: 'first_name' })
  firstName!: string;

  @ApiProperty({
    name: 'last_name',
    type: String,
    description: 'The last name of the user',
    nullable: false,
  })
  @IsString()
  @MaxLength(100, {
    message: 'Last name is too long',
  })
  @Expose({ name: 'last_name' })
  lastName!: string;
}
