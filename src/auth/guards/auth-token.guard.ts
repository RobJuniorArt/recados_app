import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Não Logado!');
    }

    try {
      const payload = await this.jwtService;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Falha ao logar!');
    }
  }
  extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.get('authorization');

    if (!authorization || typeof authorization !== 'string') {
      return;
    }

    return authorization.split(' ')[1];
  }
}
