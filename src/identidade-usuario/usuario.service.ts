import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  public constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  public async criar(email: string, senha: string): Promise<Usuario> {
    const usuario = this.usuarioRepository.create({
      email,
      senha,
    });

    return await this.usuarioRepository.save(usuario);
  }

  public buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { email },
    });
  }
}
