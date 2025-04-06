import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Patch,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { VerificarJwtGuard } from '../../../identidade-usuario/autenticar-usuario/guards/verificar-jwt.guard';
import { UsuarioService } from '../../../identidade-usuario/usuario.service';
import { UrlIdParam } from '../../url-id.parm';
import { UrlService } from '../../url.service';
import { AtualizarUrlDto } from '../atualizar-url.dto';

@Controller('urls')
export class AtualizarUrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @Patch(':urlId')
  @UseGuards(VerificarJwtGuard)
  async atualizar(
    @Param() params: UrlIdParam,
    @Body() atualizarUrlDto: AtualizarUrlDto,
    @Request() req: { usuario: { email: string } },
    @Res() res: Response,
  ) {

    const usuario = await this.usuarioService.buscarPorEmail(req.usuario.email);

    if (usuario === null) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Usuário não encontrado' });
    }

    const url = await this.urlService.buscarPorId(params.urlId);

    if (url === null) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Url não encontrada' });
    }

    if (url.usuario.id !== usuario.id) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Você não tem permissão para atualizar esta Url' });
    }

    await this.urlService.atualizar(
      params.urlId,
      atualizarUrlDto.origem,
    );

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Url atualizada com sucesso' });
  }
}
