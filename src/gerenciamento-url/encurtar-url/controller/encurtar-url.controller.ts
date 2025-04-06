import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtrairJwtGuard } from '../../..//identidade-usuario/autenticar-usuario/guards/extrair-jwt.guard';
import { UsuarioService } from '../../..//identidade-usuario/usuario.service';
import { Usuario } from '../../../identidade-usuario/usuario.entity';
import { UrlService } from '../../url.service';
import { EncurtarUrlDto } from '../encurtar-url.dto';
import { EncutarUrlService } from '../encutar-url.service';

@Controller('urls')
export class EncutarUrlController {
  constructor(
    private readonly encutarUrlService: EncutarUrlService,
    private readonly urlService: UrlService,
    private readonly configService: ConfigService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @UseGuards(ExtrairJwtGuard)
  @Post()
  async encutar(
    @Body() encurtarUrlDto: EncurtarUrlDto,
    @Request() req,
  ): Promise<{ encurtada: string }> {
    const codigo = this.encutarUrlService.encutar(encurtarUrlDto.origem);

    const base = this.configService.get('BASE_URL');
    const encurtada = `${base}/${codigo}`;

    let usuario: Usuario | undefined;

    if (req.usuario) {
      usuario =
        (await this.usuarioService.buscarPorEmail(req.usuario.email)) ||
        undefined;
    }

    this.urlService.criar(encurtarUrlDto.origem, encurtada, [], usuario);

    return { encurtada };
  }
}
