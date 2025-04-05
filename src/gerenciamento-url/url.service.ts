import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from "../identidade-usuario/usuario.entity";
import { LogAcesso } from "./log_acesso.entity";
import { Url } from "./url.entity";

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
  ) { }


  async criar(origem: string, encurtada: string, acessos: LogAcesso[], usuario?: Usuario) {
    const entity = this.urlRepository.create({
      origem,
      encurtada,
      acessos,
      usuario
    });

    await this.urlRepository.save(entity);
  }
}