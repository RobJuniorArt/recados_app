import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class ParseIntIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value;
    }

    const parsedValue = Number(value);

    if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
      throw new BadRequestException(
        'ParseIntIdPipe must be a positive integer',
      );
    }

    return parsedValue;
  }
}
