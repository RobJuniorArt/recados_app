import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
  }
  extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.get('authorization');

    if (!authorization || typeof authorization !== 'string') {
      return;
    }

    return authorization.split(' ')[1];
  }
}
