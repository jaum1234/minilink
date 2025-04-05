import { Controller, Get, UseGuards } from "@nestjs/common";
import { UrlService } from "src/gerenciamento-url/url.service";
import { AutenticarUsuarioGuard } from "src/identidade-usuario/autenticar-usuario/autenticar-usuario.guard";

@Controller("urls")
export class ListarUrlsController {
  constructor(
    private readonly urlService: UrlService,
  ) {}

  @UseGuards(AutenticarUsuarioGuard)
  @Get()
  listar() {
    return this.urlService.buscarTodos();
  }
}