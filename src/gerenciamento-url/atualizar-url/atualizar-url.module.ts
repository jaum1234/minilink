import { Module } from '@nestjs/common';
import { UsuarioModule } from '../../identidade-usuario/usuario.module';
import { UrlModule } from '../url.module';
import { AtualizarUrlController } from './controller/atualizar-url.controller';

@Module({
  controllers: [AtualizarUrlController],
  imports: [UrlModule, UsuarioModule],
})
export class AtualizarUrlModule {}
