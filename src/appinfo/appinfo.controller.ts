import { Controller, Get } from '@nestjs/common';
import { AppinfoService } from './appinfo.service';
import { AppInfoDto } from './dto/app-info.dto';


@Controller()
export class AppinfoController {
  constructor(private readonly appinfoService: AppinfoService) {}

  @Get('/application/info')
  getAppInfo(): AppInfoDto {    
    return new AppInfoDto();
  }
}
