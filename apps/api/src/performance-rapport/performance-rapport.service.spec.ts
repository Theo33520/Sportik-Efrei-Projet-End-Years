import { Test, TestingModule } from '@nestjs/testing';
import { PerformanceRapportService } from './performance-rapport.service';

describe('PerformanceRapportService', () => {
  let service: PerformanceRapportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerformanceRapportService],
    }).compile();

    service = module.get<PerformanceRapportService>(PerformanceRapportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
