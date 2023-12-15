import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Response } from 'express';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should send HTML file', () => {
      const mockResponse = { sendFile: jest.fn() } as unknown as Response;
      jest
        .spyOn(appService, 'getHello')
        .mockImplementation(() => appService.getHello(mockResponse));

      appController.getHello(mockResponse);

      expect(appService.getHello).toBe(mockResponse);
      expect(mockResponse.sendFile).toBe(
        expect.stringContaining('/public/index.html'),
      );
    });
  });
});
