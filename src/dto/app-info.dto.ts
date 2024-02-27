// AppInfoDto
import { ApiProperty } from '@nestjs/swagger';

export class AppInfoDto {
    @ApiProperty({ nullable: false })
    name: string;

    @ApiProperty({ nullable: false })
    version: string;

    @ApiProperty({ nullable: false })
    description: string;

    @ApiProperty({ nullable: false })
    author: string;

    constructor(appinfo: AppInfoDto) {
      this.name = appinfo.name;
      this.version = appinfo.version;
      this.description = appinfo.description;
      this.author = appinfo.author;
    }
  }