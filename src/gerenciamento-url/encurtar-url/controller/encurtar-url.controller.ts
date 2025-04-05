import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EncurtarUrlDto } from '../encurtar-url.dto';
import { EncutarUrlService } from '../encutar-url.service';

@Controller('urls')
export class EncutarUrlController {
  constructor(
    private readonly encutarUrlService: EncutarUrlService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  encutar(@Body() encurtarUrlDto: EncurtarUrlDto): { encurtada: string } {
    const codigo = this.encutarUrlService.encutar(encurtarUrlDto.origem);
    this.encutarUrlService.criar(encurtarUrlDto.origem, codigo, [], undefined);
    
    return { encurtada: `${this.configService.get("BASE_URL")}/${codigo}` };
  }
}
