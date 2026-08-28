import { PartialType } from '@nestjs/mapped-types';
import { CreateRecadoDto } from './create-recado.dto';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateRecadoDto extends PartialType(CreateRecadoDto) {
  // @IsString()
  // @IsNotEmpty()
  // @MinLength(5)
  // @MaxLength(255)
  // readonly texto!: string;
}
