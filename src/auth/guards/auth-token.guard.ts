import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from '../config/jwt.config';
import * as config from '@nestjs/config';
import { REQUEST_TOKEN_PAYLOAD_KEY } from '../auth.constants';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly JwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: config.ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Não Logado!');
    }

    try {
      const payload = await this.JwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      request[REQUEST_TOKEN_PAYLOAD_KEY] = payload;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Falha ao logar!');
    }
    return true;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.get('authorization'); //antigamente era request.headers.authorizations

    if (!authorization || typeof authorization !== 'string') {
      return;
    }

    return authorization.split(' ')[1];
  }
}
