import {
  Controller,
  Delete,
  HttpStatus,
  Param,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { VerificarJwtGuard } from '../../../identidade-usuario/autenticar-usuario/guards/verificar-jwt.guard';
import { UsuarioService } from '../../../identidade-usuario/usuario.service';
import { UrlService } from '../../url.service';

@Controller('urls')
export class ExcluirUrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @Delete(':urlId')
  @UseGuards(VerificarJwtGuard)
  async excluir(
    @Param('urlId') id: string,
    @Request() req: { usuario: { email: string } },
    @Res() res: Response,
  ): Promise<Response | undefined> {
    const usuario = await this.usuarioService.buscarPorEmail(req.usuario.email);

    if (usuario === null) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Usuário não encontrado' });
    }

    const url = await this.urlService.buscarPorId(Number.parseInt(id));

    if (url === null) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Url não encontrada' });
    }

    if (url.usuario.id !== usuario.id) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Você não tem permissão para excluir esta Url' });
    }

    await this.urlService.excluir(Number.parseInt(id));

    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
