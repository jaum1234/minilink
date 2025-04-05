import { Controller, Get, HttpStatus, Request, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { VerificarJwtGuard } from "../../../identidade-usuario/autenticar-usuario/guards/verificar-jwt.guard";
import { UsuarioService } from "../../../identidade-usuario/usuario.service";
import { UrlService } from "../../url.service";

@Controller("urls")
export class ListarUrlsController {
  constructor(
    private readonly urlService: UrlService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @Get()
  @UseGuards(VerificarJwtGuard)
  async listar(@Request() req: { usuario: { email: string } }, @Res() res: Response) {
    const usuario = await this.usuarioService.buscarPorEmail(req.usuario.email);

    if (usuario === null) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "Usuário não encontrado" });
    }
    
    const urls = await this.urlService.buscarTodos(usuario);

    return res.status(HttpStatus.OK).json(urls);
  }
}