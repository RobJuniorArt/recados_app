import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class ChangeDataInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    console.log('ChangeDataInterceptor executado antes');

    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
