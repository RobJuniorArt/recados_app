import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OnlyLowerCaseLettersRegex } from './only-lowercase-letters.regex';
import { RemoveSpacesRegex } from './remove-spaces.regex';
import { RegexProtocol } from './regex-protocol.regex';

export type ClassNames = 'OnlyLowerCaseLettersRegex' | 'RemoveSpacesRegex';

@Injectable() //vou usar essa classe dentro do sistema de injeção de dependencias
export class RegexFactory {
  create(className: ClassNames): RegexProtocol {
    //posso ter logica aqui
    switch (className) {
      case 'OnlyLowerCaseLettersRegex':
        return new OnlyLowerCaseLettersRegex();
      case 'RemoveSpacesRegex':
        return new RemoveSpacesRegex();
      default:
        throw new InternalServerErrorException(
          `Unsupported regex class: ${className}`,
        );
    }
  }
}
