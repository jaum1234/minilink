import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "../usuario.entity";
import { CadastrarUsuarioController } from "./cadastrar-usuario.controller";
import { CadastrarUsuarioService } from "./cadastrar-usuario.service";

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [CadastrarUsuarioController],
  providers: [CadastrarUsuarioService]
})
export class CadastrarUsuarioModule {}