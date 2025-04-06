import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LogAcessoModule } from '../log_acesso.module';
import { UrlModule } from '../url.module';
import { RedirecionarParaOrigemController } from './controller/redirecionar-para-origem.controller';

@Module({
  controllers: [RedirecionarParaOrigemController],
  imports: [ConfigModule, LogAcessoModule, UrlModule],
})
export class RedirecionarParaOrigemModule {}
