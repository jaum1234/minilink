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
import { UrlIdParam } from 'src/gerenciamento-url/url-id.parm';
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
    @Param() params: UrlIdParam,
    @Request() req: { usuario: { email: string } },
    @Res() res: Response,
  ): Promise<Response | undefined> {
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
        .json({ message: 'Você não tem permissão para excluir esta Url' });
    }

    await this.urlService.excluir(params.urlId);

    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
