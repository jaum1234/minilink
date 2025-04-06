import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class AutenticarUsuarioService {
  public constructor(private readonly jwtService: JwtService) {}

  public async gerarJwt(email: string) {
    return await this.jwtService.signAsync({ email });
  }

  public async compararSenhas(
    senha: string,
    senhaHash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(senha, senhaHash);
  }
}
