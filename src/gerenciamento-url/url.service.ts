import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../identidade-usuario/usuario.entity';
import { LogAcesso } from './log_acesso.entity';
import { Url } from './url.entity';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
  ) {}

  async criar(
    origem: string,
    encurtada: string,
    acessos: LogAcesso[],
    usuario?: Usuario,
  ) {
    const entity = this.urlRepository.create({
      origem,
      encurtada,
      acessos,
      usuario,
    });

    return await this.urlRepository.save(entity);
  }

  async buscarTodos(usuario: Usuario): Promise<Url[]> {
    const urls = await this.urlRepository.find({
      where: {
        usuario: {
          id: usuario.id,
        },
      },
      relations: {
        acessos: true,
        usuario: true,
      },
      select: {
        id: true,
        origem: true,
        updatedAt: true,
        createdAt: true,
        acessos: true,
        encurtada: true,
        deletedAt: true,
        usuario: {
          id: true,
          email: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return urls.map((url) => ({
      ...url,
      totalAcessos: url.acessos.length,
    }));
  }

  async buscarPorId(id: number): Promise<Url | null> {
    return await this.urlRepository.findOne({
      where: {
        id,
      },
      relations: {
        usuario: true,
      },
    });
  }

  async buscarPorEncurtada(encurtada: string): Promise<Url | null> {
    return await this.urlRepository.findOne({
      where: {
        encurtada,
      },
    });
  }

  async excluir(urlId: number) {
    await this.urlRepository.softDelete({
      id: urlId,
    });
  }

  async atualizar(id: number, origem: string) {
    return await this.urlRepository.update(
      {
        id,
      },
      {
        origem,
      },
    );
  }

  async adicionarAcesso(urlId: number, logAcesso: LogAcesso) {
    const url = await this.urlRepository.findOne({
      where: {
        id: urlId,
      },
      relations: {
        acessos: true,
      },
    });

    if (url === null) return;

    url.acessos.push(logAcesso);

    await this.urlRepository.save(url);
  }
}
