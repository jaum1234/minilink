import { Module } from "@nestjs/common";
import { UrlModule } from "../url.module";
import { EncutarUrlController } from "./controller/encurtar-url.controller";
import { EncutarUrlService } from "./encutar-url.service";

@Module({
  imports: [UrlModule],
  controllers: [EncutarUrlController],
  providers: [EncutarUrlService]
})
export class EncurtarUrlModule {}