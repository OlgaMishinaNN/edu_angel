import { Module } from '@nestjs/common';
import { AppinfoService } from './appinfo.service';
import { AppinfoController } from './appinfo.controller';

@Module({
  controllers: [AppinfoController],
  providers: [AppinfoService],
})
export class AppinfoModule {}
