import { Test, TestingModule } from '@nestjs/testing';
import { CompetionController } from './competion.controller';

describe('CompetionController', () => {
  let controller: CompetionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompetionController],
    }).compile();

    controller = module.get<CompetionController>(CompetionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
