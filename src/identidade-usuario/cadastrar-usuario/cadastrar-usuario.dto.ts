import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CadastrarUsuarioDto {
  @IsEmail(
    {},
    { message: 'O campo email deve ser um endereço de mail válido.' },
  )
  @IsNotEmpty({ message: 'O campo email é obrigatório.' })
  email!: string;

  @IsNotEmpty({ message: 'O campo senha é obrigatório.' })
  @MinLength(8, { message: 'O campo senha deve ter no mínimo 8 caracteres.' })
  senha!: string;

  @IsNotEmpty({ message: 'O campo confirmação de senha é obrigatório.' })
  @MinLength(8, {
    message: 'O campo confirmação de senha deve ter no mínimo 8 caracteres.',
  })
  confirmacaoSenha!: string;
}
