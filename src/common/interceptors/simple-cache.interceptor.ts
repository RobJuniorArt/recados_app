import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { of, tap } from 'rxjs';

@Injectable()
export class SimpleCachInterceptor implements NestInterceptor {
  private readonly cache = new Map();

  async intercept(context: ExecutionContext, next: CallHandler) {
    console.log('SimpleCachInterceptor executado antes');
    const request = context.switchToHttp().getRequest();
    const url = request.url;

    if (this.cache.has(url)) {
      console.log('Está na cache', url);
      return of(this.cache.get(url)); //retorna um observer
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return next.handle().pipe(
      //para colocar no cache uso pipe
      tap((data) => {
        this.cache.set(url, data);
        console.log('Armazenado em cache', url);
      }),
    );
  }
}
