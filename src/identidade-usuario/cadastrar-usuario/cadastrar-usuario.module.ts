import { Module } from "@nestjs/common";
import { UsuarioModule } from "../usuario.module";
import { CadastrarUsuarioService } from "./cadastrar-usuario.service";
import { CadastrarUsuarioController } from "./controller/cadastrar-usuario.controller";

@Module({
  imports: [UsuarioModule],
  controllers: [CadastrarUsuarioController],
  providers: [CadastrarUsuarioService],
})
export class CadastrarUsuarioModule {}