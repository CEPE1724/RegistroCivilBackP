import { Test, TestingModule } from '@nestjs/testing';
import { CreNacionalidadService } from './cre_nacionalidad.service';

describe('CreNacionalidadService', () => {
  let service: CreNacionalidadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreNacionalidadService],
    }).compile();

    service = module.get<CreNacionalidadService>(CreNacionalidadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
