import { SetMetadata } from '@nestjs/common';
import { ROUTE_POLICY_KEY } from '../auth.constants';

export const SetRoutePolicy = () => {
  return SetMetadata(ROUTE_POLICY_KEY, 'findAllRecados');
};
