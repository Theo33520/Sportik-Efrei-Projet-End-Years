import { Test, TestingModule } from '@nestjs/testing';
import { PerformanceRapportController } from './performance-rapport.controller';

describe('PerformanceRapportController', () => {
  let controller: PerformanceRapportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerformanceRapportController],
    }).compile();

    controller = module.get<PerformanceRapportController>(PerformanceRapportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
