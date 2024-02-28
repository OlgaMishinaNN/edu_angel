// AppInfoDto
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AppInfoDto {
    @ApiProperty({ 
      type: String,
      description: "The name of the application",
      nullable: false })
    @IsString()
    readonly name: string;

    @ApiProperty({ 
      type: String,
      description: "The current version of the application",
      nullable: false })
    @IsString()
    readonly version: string;

    @ApiProperty({ 
      type: String,
      description: "The description of the application",
      nullable: false })
    @IsString()
    readonly description: string;

    @ApiProperty({ 
      type: String,
      description: "The author of the application",
      nullable: false })
    @IsString()
    readonly author: string;

    constructor() {
      this.name = process.env.npm_package_config_name ?? 'undefined';
      this.version = process.env.npm_package_config_version ?? 'undefined';
      this.description = process.env.npm_package_config_description ?? 'undefined';
      this.author = process.env.npm_package_config_author ?? 'undefined';
    }
  }