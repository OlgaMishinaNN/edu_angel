import { Test, TestingModule } from '@nestjs/testing';
import { AppInfoController } from './appinfo.controller';
import { AppInfoService } from './appinfo.service';
import { AppInfoDto } from './dto/app-info.dto';

describe('AppInfoController', () => {
  let controller: AppInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppInfoController],
      providers: [AppInfoService],
    }).compile();

    controller = module.get<AppInfoController>(AppInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAppInfo => should return app info', async () => {
    const appInfo = new AppInfoDto();

    const result = controller.getAppInfo();

    expect(result).toEqual(appInfo);
  });
});
