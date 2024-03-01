import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class UserDto {
    @ApiProperty({ 
      type: String,
      description: "The id of the user",
      nullable: false })
    id: string;

    @ApiProperty({ 
      type: String,
      description: "The email of the user",
      nullable: false })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ 
      type: String,
      description: "The first name of the user",
      nullable: false })
    @IsString()
    first_name: string;

    @ApiProperty({ 
      type: String,
      description: "The last name of the user",
      nullable: false })
    @IsString()
    last_name: string;

    @ApiProperty({ 
      type: String,
      description: "Creation timestamp",
      nullable: false })
    created_at: Date

    @ApiProperty({ 
      type: String,
      description: "Deletion timestamp",
      nullable: true })
    deleted_at: Date
}
