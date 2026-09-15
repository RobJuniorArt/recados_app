import { Injectable } from '@nestjs/common';

@Injectable()
export class RecadosUtils {
  inverteString(str: string): string {
    return str.split('').reverse().join('');
  }
}

@Injectable()
export class RecadosUtilMock {
  inverteString() {
    return 'Retorno do moc';
  }
}
