import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { Usuario } from "../usuario.entity";

@Injectable()
export class CadastrarUsuarioService {
  public constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) {}

  public async buscarPorEmail(email: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({ where: { email } });
  }

  public async criar(email: string, senha: string): Promise<Usuario> {
    const usuario = this.usuarioRepository.create({
      email,
      senha
    });

    return await this.usuarioRepository.save(usuario);
  }

  public async hashSenha(senha: string): Promise<string> {
    return await bcrypt.hash(senha, 12);
  }
}