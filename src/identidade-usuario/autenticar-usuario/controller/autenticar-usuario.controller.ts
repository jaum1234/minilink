import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsuarioService } from '../../usuario.service';
import { AutenticarUsuarioDto } from '../autenticar-usuario.dto';
import { AutenticarUsuarioService } from '../autenticar-usuario.service';

@Controller('auth')
export class AutenticarUsuarioController {
  public constructor(
    private readonly autenticarUsuarioService: AutenticarUsuarioService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @Post('autenticar')
  public async autenticar(
    @Body() autenticarUsuarioDto: AutenticarUsuarioDto,
    @Res() res: Response,
  ) {
    const { email, senha } = autenticarUsuarioDto;

    const usuario = await this.usuarioService.buscarPorEmail(email);

    if (usuario === null) {
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Usuário não encontrado',
      });
    }

    if (
      !(await this.autenticarUsuarioService.compararSenhas(
        senha,
        usuario.senha,
      ))
    ) {
      return res.status(400).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Senha incorreta.',
      });
    }

    const jwt = await this.autenticarUsuarioService.gerarJwt(email);

    return res.status(200).json({
      statusCode: HttpStatus.OK,
      data: {
        accessToken: jwt,
      },
      message: 'Usuário autenticado com sucesso',
    });
  }
}
