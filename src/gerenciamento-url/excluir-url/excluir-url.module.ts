import { Module } from "@nestjs/common";
import { UsuarioModule } from "../../identidade-usuario/usuario.module";
import { UrlModule } from "../url.module";
import { ExcluirUrlController } from "./controller/excluir-url.controller";

@Module({
  controllers: [ExcluirUrlController],
  imports: [UrlModule, UsuarioModule]
})
export class ExcluirUrlModule {}