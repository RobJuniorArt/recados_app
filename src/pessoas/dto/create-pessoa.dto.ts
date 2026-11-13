import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePessoaDto {
  @IsEmail()
  email!: string; //email sera usuario

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password!: string; //sera convertida em hashing

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name!: string;
}
