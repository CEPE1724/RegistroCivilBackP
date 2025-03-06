import { Test, TestingModule } from '@nestjs/testing';
import { CreProfesionService } from './cre_profesion.service';

describe('CreProfesionService', () => {
  let service: CreProfesionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreProfesionService],
    }).compile();

    service = module.get<CreProfesionService>(CreProfesionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
