import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UrlService } from "../../url.service";
import { EncurtarUrlDto } from '../encurtar-url.dto';
import { EncutarUrlService } from '../encutar-url.service';

@Controller('urls')
export class EncutarUrlController {
  constructor(
    private readonly encutarUrlService: EncutarUrlService,
    private readonly urlService: UrlService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  encutar(@Body() encurtarUrlDto: EncurtarUrlDto): { encurtada: string } {
    const codigo = this.encutarUrlService.encutar(encurtarUrlDto.origem);

    const base = this.configService.get("BASE_URL")
    const encurtada = `${base}/${codigo}`

    this.urlService.criar(encurtarUrlDto.origem, encurtada, [], undefined);
    
    return { encurtada };
  }
}
