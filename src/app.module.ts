import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import databaseConfig from './database.config';
import { AtualizarUrlModule } from './gerenciamento-url/atualizar-url/atualizar-url.module';
import { EncurtarUrlModule } from './gerenciamento-url/encurtar-url/encurtar-url.module';
import { ExcluirUrlModule } from './gerenciamento-url/excluir-url/excluir-url.module';
import { ListarUrlsModule } from './gerenciamento-url/listar-urls/listar-urls.module';
import { LogAcessoModule } from './gerenciamento-url/log_acesso.module';
import { RedirecionarParaOrigemModule } from './gerenciamento-url/redirecionar-para-origem/redirecionar-para-origem.module';
import { UrlModule } from './gerenciamento-url/url.module';
import { AutenticarUsuarioModule } from './identidade-usuario/autenticar-usuario/autenticar-usuario.module';
import { CadastrarUsuarioModule } from './identidade-usuario/cadastrar-usuario/cadastrar-usuario.module';
import { UsuarioModule } from './identidade-usuario/usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}.local`,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get<TypeOrmModuleOptions>('database'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    EncurtarUrlModule,
    CadastrarUsuarioModule,
    UsuarioModule,
    AutenticarUsuarioModule,
    UrlModule,
    ListarUrlsModule,
    ExcluirUrlModule,
    AtualizarUrlModule,
    LogAcessoModule,
    RedirecionarParaOrigemModule,
  ],
})
export class AppModule {}
