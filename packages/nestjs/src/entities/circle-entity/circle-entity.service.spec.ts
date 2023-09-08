import { Test, TestingModule } from '@nestjs/testing';
import { CircleEntityService } from './circle-entity.service';

describe('CircleEntityService', () => {
  let service: CircleEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CircleEntityService],
    }).compile();

    service = module.get<CircleEntityService>(CircleEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
