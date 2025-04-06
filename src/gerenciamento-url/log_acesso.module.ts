import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogAcesso } from './log_acesso.entity';
import { LogAcessoService } from './log_acesso.service';

@Module({
  imports: [TypeOrmModule.forFeature([LogAcesso])],
  providers: [LogAcessoService],
  exports: [LogAcessoService],
})
export class LogAcessoModule {}
