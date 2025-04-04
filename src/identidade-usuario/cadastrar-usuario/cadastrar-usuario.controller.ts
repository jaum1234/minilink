import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { CadastrarUsuarioService } from "./cadastrar-usuario.service";

@Controller('auth')
export class CadastrarUsuarioController {
  constructor(
    private readonly cadastrarUsuarioService: CadastrarUsuarioService,
  ) {}

  @Post('cadastrar')
  public async cadastrar(
    @Body('email') email: string,
    @Body('senha') senha: string,
    @Body('confirmacao_senha') confirmacaoSenha: string,
    @Res() res: Response
  ) {

    if (await this.cadastrarUsuarioService.buscarPorEmail(email) !== null) {
      return res.status(HttpStatus.BAD_REQUEST).json({ mensagem: 'Email já cadastrado' });
    }
    
    if (senha !== confirmacaoSenha) {
      return res.status(HttpStatus.BAD_REQUEST).json({ mensagem: 'As senhas não coincidem' });
    }

    const hash = await this.cadastrarUsuarioService.hashSenha(senha);

    await this.cadastrarUsuarioService.criar(email, hash);

    return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.' });
  }
}