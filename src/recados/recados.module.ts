import { forwardRef, Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtilMock, RecadosUtils } from './recados.utils';
import {
  ONLY_LOWERCASE_LETTERS_REGEX,
  REMOVE_SPACE_REGEX,
  SERVER_NAME,
} from 'src/recados/recados.constante';
import { RemoveSpacesRegex } from 'src/common/regex/remove-spaces.regex';
import { OnlyLowerCaseLettersRegex } from 'src/common/regex/only-lowercase-letters.regex';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recado]),
    forwardRef(() => PessoasModule),
  ],
  controllers: [RecadosController],
  providers: [
    RecadosService,
    {
      provide: RecadosUtils, // token
      useValue: new RecadosUtilMock(), // valor ser usada
    },
    {
      provide: SERVER_NAME,
      useValue: 'My name is NestJS',
    },
    {
      provide: ONLY_LOWERCASE_LETTERS_REGEX,
      useClass: OnlyLowerCaseLettersRegex,
    },
    {
      provide: REMOVE_SPACE_REGEX,
      useClass: RemoveSpacesRegex,
    },
  ],
  exports: [RecadosUtils, SERVER_NAME],
})
export class RecadosModule {}
