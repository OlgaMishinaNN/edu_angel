import { Module } from '@nestjs/common';
import { AppInfoService } from './appinfo.service';
import { AppInfoController } from './appinfo.controller';

@Module({
  controllers: [AppInfoController],
  providers: [AppInfoService],
})
export class AppInfoModule {}
