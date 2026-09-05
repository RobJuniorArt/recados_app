import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class TimmingConnectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const startTime = Date.now();
    console.log('TimmingConnectionInterceptor executado antes');

    await new Promise((resolve) => setTimeout(resolve, 3000));
    return next.handle().pipe(
      tap(() => {
        const finalTime = Date.now();
        const elapsed = finalTime - startTime;
        console.log(
          `TimingConnectionInterceptor: levou ${elapsed}ms para executar `,
        );
      }),
    );
  }
}
