import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";

@Injectable()
export class CadastrarUsuarioService {
  public async hashSenha(senha: string): Promise<string> {
    return await bcrypt.hash(senha, 12);
  }
}