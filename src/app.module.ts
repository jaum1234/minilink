import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import databaseConfig from './database.config';
import { EncurtarUrlModule } from './gerenciamento-url/encurtar-url/encurtar-url.module';
import { CadastrarUsuarioModule } from './identidade-usuario/cadastrar-usuario/cadastrar-usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}.local`,
      load: [databaseConfig]
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
    CadastrarUsuarioModule
  ],
})
export class AppModule {}
