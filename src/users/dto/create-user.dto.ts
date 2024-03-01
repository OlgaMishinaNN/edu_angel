import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MaxLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ 
      type: String,
      description: "The email of the user",
      nullable: false })
    @IsEmail()
    @MaxLength(255, {
      message: 'Email is too long',
    })
    email: string;

    @ApiProperty({ 
      type: String,
      description: "The first name of the user",
      nullable: false })
    @IsString()
    @MaxLength(100, {
      message: 'First name is too long',
    })
    first_name: string;

    @ApiProperty({ 
      type: String,
      description: "The last name of the user",
      nullable: false })
    @IsString()
    @MaxLength(100, {
      message: 'Last name is too long',
    })
    last_name: string;
    
}
