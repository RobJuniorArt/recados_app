import { RegexProtocol } from './regex-protocol.regex';

export class OnlyLowerCaseLettersRegex implements RegexProtocol {
  execute(str: string): string {
    return str.replace(/[^a-z]/g, '');
  }
}
