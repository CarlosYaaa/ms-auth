import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CredencialesUsuario {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UsuarioLoginRequest {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CredencialesUsuario)
  credencialesUsuario: CredencialesUsuario;

  @IsString()
  @IsNotEmpty()
  tipoUsuario: string;
}
