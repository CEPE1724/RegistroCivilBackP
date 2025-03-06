import { Test, TestingModule } from '@nestjs/testing';
import { CreTiposueldoService } from './cre_tiposueldo.service';

describe('CreTiposueldoService', () => {
  let service: CreTiposueldoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreTiposueldoService],
    }).compile();

    service = module.get<CreTiposueldoService>(CreTiposueldoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
