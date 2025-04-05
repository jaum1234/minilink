import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UsuarioModule } from "../usuario.module";
import { AutenticarUsuarioService } from "./autenticar-usuario.service";
import { AutenticarUsuarioController } from "./controller/autenticar-usuario.controller";

@Module({
  imports: [
    UsuarioModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AutenticarUsuarioController],
  providers: [AutenticarUsuarioService]
})
export class AutenticarUsuarioModule {}