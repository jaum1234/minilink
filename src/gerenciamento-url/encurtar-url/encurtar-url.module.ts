import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Url } from "../url.entity";
import { EncutarUrlController } from "./encurtar-url.controller";
import { EncutarUrlService } from "./encutar-url.service";

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  controllers: [EncutarUrlController],
  providers: [EncutarUrlService]
})
export class EncurtarUrlModule {}