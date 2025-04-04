import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "../usuario.entity";
import { CadastrarUsuarioService } from "./cadastrar-usuario.service";
import { CadastrarUsuarioController } from "./controller/cadastrar-usuario.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [CadastrarUsuarioController],
  providers: [CadastrarUsuarioService]
})
export class CadastrarUsuarioModule {}