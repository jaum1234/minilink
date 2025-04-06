import { IsNotEmpty, IsUrl } from "class-validator";

export class EncurtarUrlDto {
  @IsNotEmpty({ message: "Campo origem não pode ser vazio" })
  @IsUrl({}, { message: "Campo origem deve ser uma url válida" })
  readonly origem!: string;
}
