import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogAcesso } from './log_acesso.entity';
import { Url } from './url.entity';

@Injectable()
export class LogAcessoService {
  constructor(
    @InjectRepository(LogAcesso)
    private readonly logAcessoRepository: Repository<LogAcesso>,
  ) {}

  async criar(url: Url) {
    const log = this.logAcessoRepository.create({
      url,
    });

    return await this.logAcessoRepository.save(log);
  }
}
