import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { Usuario } from 'src/identidade-usuario/usuario.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { LogAcesso } from '../log_acesso.entity';
import { Url } from '../url.entity';

@Injectable()
export class EncutarUrlService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
  ) {}

  encutar(origem: string): string {
    const hash = crypto.createHash('md5').update(origem + uuidv4()).digest('base64');
    const codigo = hash.replace(/[^a-zA-Z0-9]/g, '').substring(0, 6);

    return codigo;
  }

  async criar(origem: string, encurtada: string, acessos: LogAcesso[], usuario?: Usuario) {
    const entity = this.urlRepository.create({
      origem,
      encurtada,
      acessos,
      usuario
    });


    await this.urlRepository.save(entity);
  }
}