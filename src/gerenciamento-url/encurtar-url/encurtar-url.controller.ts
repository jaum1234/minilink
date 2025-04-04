import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EncutarUrlService } from './encutar-url.service';

@Controller('urls')
export class EncutarUrlController {
  constructor(
    private readonly encutarUrlService: EncutarUrlService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  encutar(@Body('origem') origem: string): { encurtada: string } {
    const codigo = this.encutarUrlService.encutar(origem);
    this.encutarUrlService.criar(origem, codigo, [], undefined);
    
    return { encurtada: `${this.configService.get("BASE_URL")}/${codigo}` };
  }
}
