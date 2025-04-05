import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { UsuarioService } from "../../usuario.service";
import { AutenticarUsuarioDto } from "../autenticar-usuario.dto";
import { AutenticarUsuarioService } from "../autenticar-usuario.service";

@Controller("auth")
export class AutenticarUsuarioController {
  public constructor(
    private readonly autenticarUsuarioService: AutenticarUsuarioService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @Post("autenticar")
  public async autenticar(@Body() AutenticarUsuarioDto: AutenticarUsuarioDto, @Res() res: Response) {
    const { email, senha } = AutenticarUsuarioDto;
    
    const usuario = await this.usuarioService.buscarPorEmail(email);

    if (usuario === null) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    if (!await this.autenticarUsuarioService.compararSenhas(senha, usuario.senha)) {
      return res.status(400).json({ mensagem: "Senha incorreta." });
    }

    const jwt = await this.autenticarUsuarioService.gerarJwt(email);

    return res.status(200).json({ accessToken: jwt });
  }
}