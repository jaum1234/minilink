import { Module } from '@nestjs/common';
import { AutenticarUsuarioModule } from 'src/identidade-usuario/autenticar-usuario/autenticar-usuario.module';
import { UsuarioModule } from '../../identidade-usuario/usuario.module';
import { UrlModule } from '../url.module';
import { EncutarUrlController } from './controller/encurtar-url.controller';
import { EncutarUrlService } from './encutar-url.service';

@Module({
  imports: [UrlModule, AutenticarUsuarioModule, UsuarioModule],
  controllers: [EncutarUrlController],
  providers: [EncutarUrlService],
})
export class EncurtarUrlModule {}
