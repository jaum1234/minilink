import { IsNotEmpty } from 'class-validator';

export class UrlIdParam {
  @IsNotEmpty({ message: 'Campo urlId não pode ser vazio.' })
  urlId!: number;
}
