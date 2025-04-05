import { Body, Controller, HttpStatus, Inject, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { UsuarioService } from "../../usuario.service";
import { CadastrarUsuarioDto } from "../cadastrar-usuario.dto";
import { CadastrarUsuarioService } from "../cadastrar-usuario.service";

@Controller('auth')
export class CadastrarUsuarioController {
  constructor(
    private readonly cadastrarUsuarioService: CadastrarUsuarioService,
    @Inject(UsuarioService)
    private readonly usuarioService: UsuarioService,
  ) {}

  @Post('cadastrar')
  public async cadastrar(
    @Body() cadastrarUsuarioDto: CadastrarUsuarioDto,
    @Res() res: Response
  ) {

    const { email, senha, confirmacaoSenha } = cadastrarUsuarioDto;

    if (await this.usuarioService.buscarPorEmail(email) !== null) {
      return res.status(HttpStatus.BAD_REQUEST).json({ mensagem: 'Email já cadastrado' });
    }
    
    if (senha !== confirmacaoSenha) {
      return res.status(HttpStatus.BAD_REQUEST).json({ mensagem: 'As senhas não coincidem' });
    }

    const hash = await this.cadastrarUsuarioService.hashSenha(senha);

    await this.usuarioService.criar(email, hash);

    return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.' });
  }
}