import { Controller, Get, UseGuards } from "@nestjs/common";
import { VerificarJwtGuard } from "../../../identidade-usuario/autenticar-usuario/guards/verificar-jwt.guard";
import { UrlService } from "../../url.service";

@Controller("urls")
export class ListarUrlsController {
  constructor(
    private readonly urlService: UrlService,
  ) {}

  @UseGuards(VerificarJwtGuard)
  @Get()
  listar() {
    return this.urlService.buscarTodos();
  }
}