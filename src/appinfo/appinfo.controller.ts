import { Controller, Get } from '@nestjs/common';
import { AppInfoService } from './appinfo.service';
import { AppInfoDto } from './dto/app-info.dto';

@Controller()
export class AppInfoController {
  constructor(private readonly appInfoService: AppInfoService) {}

  @Get('/application/info')
  getAppInfo(): AppInfoDto {
    return new AppInfoDto();
  }
}
