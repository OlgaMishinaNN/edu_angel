import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppInfoService } from './appinfo.service';
import { AppInfoDto } from './dto/app-info.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('AppInfo API')
@Controller()
export class AppInfoController {
  constructor(private readonly appInfoService: AppInfoService) {}

  @Get('/application/info')
  @ApiOperation({ summary: 'Returns the application info' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: AppInfoDto,
  })
  getAppInfo(): AppInfoDto {
    return new AppInfoDto();
  }
}
