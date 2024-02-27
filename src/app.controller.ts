import { Controller, Get, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AppInfoDto } from './dto/app-info.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/application/info')
  getAppInfo(): AppInfoDto {    
    return new AppInfoDto();
  }
}
