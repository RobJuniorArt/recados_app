import { CanActivate, ExecutionContext } from '@nestjs/common';

export class RoutePolicyGuard implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
  }
}
