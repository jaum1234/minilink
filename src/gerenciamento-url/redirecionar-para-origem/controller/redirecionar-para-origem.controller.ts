import { Controller, Get, Param, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { LogAcessoService } from '../../log_acesso.service';
import { UrlService } from '../../url.service';

@Controller(':urlEncurtada')
export class RedirecionarParaOrigemController {
  public constructor(
    private readonly urlService: UrlService,
    private readonly configService: ConfigService,
    private readonly logAcessoService: LogAcessoService,
  ) {}

  @Get()
  async redirecionar(
    @Param('urlEncurtada') urlEncurtada: string,
    @Res() res: Response,
  ) {
    const base = this.configService.get<string>('BASE_URL');

    const url = await this.urlService.buscarPorEncurtada(
      `${base}/${urlEncurtada}`,
    );

    if (url === null) {
      return res.status(404).json({
        mensagem: 'Url não encontrada.',
      });
    }

    const log = await this.logAcessoService.criar(url);

    await this.urlService.adicionarAcesso(url.id, log);

    if (url.origem.match(/^https?/) === null)
      url.origem = `https://${url.origem}`;

    return res.redirect(301, url.origem);
  }
}
