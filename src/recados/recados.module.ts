import { forwardRef, Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtils } from './recados.utils';
import { RegexFactory } from 'src/common/regex/regex.factory';
import {
  ONLY_LOWERCASE_LETTERS_REGEX,
  REMOVE_SPACE_REGEX,
} from './recados.constante';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recado]),
    forwardRef(() => PessoasModule),
  ],
  controllers: [RecadosController],
  providers: [
    RecadosService,
    RecadosUtils,
    RegexFactory,
    {
      provide: REMOVE_SPACE_REGEX, // Token
      useFactory: (regexFactory: RegexFactory) => {
        //posso ter lógica aqui
        return regexFactory.create('RemoveSpacesRegex');
      }, // factory
      inject: [RegexFactory], //injetando na factory na ordem
    },
    {
      provide: ONLY_LOWERCASE_LETTERS_REGEX, // Token
      useFactory: async (regexFactory: RegexFactory) => {
        //espera algo acontecer
        await new Promise((resolve) => setTimeout(resolve, 3000));

        //posso ter lógica aqui
        return regexFactory.create('OnlyLowerCaseLettersRegex');
      }, // factory
      inject: [RegexFactory], //injetando na factory na ordem
    },
  ],
  exports: [RecadosUtils],
})
export class RecadosModule {}
