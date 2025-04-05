import { Module } from "@nestjs/common";
import { AutenticarUsuarioModule } from "src/identidade-usuario/autenticar-usuario/autenticar-usuario.module";
import { UrlModule } from "../url.module";
import { ListarUrlsController } from "./controller/listar-urls.controller";

@Module({
  controllers: [ListarUrlsController],
  imports: [UrlModule, AutenticarUsuarioModule],
  providers: [],
})
export class ListarUrlsModule {}