import { IsEmail, IsNotEmpty } from "class-validator";

export class AutenticarUsuarioDto {

  @IsEmail({}, { message: 'O campo email deve ser um endereço de email válido.' })
  @IsNotEmpty({ message: 'O campo email é obrigatório.' })
  email!: string;

  @IsNotEmpty({ message: 'O campo senha é obrigatório.' })
  senha!: string;
}
