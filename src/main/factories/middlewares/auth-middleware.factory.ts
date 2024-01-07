import { UserRepository } from '@/infrastructure/user/repository/user.repository';
import { AuthMiddleware } from '@/presentation/api/middlewares/auth-middleware';
import { makeJwtAdapter } from '../gateways/jwt-adapter.factory';

export const makeAuthMiddleware = (): AuthMiddleware => {
  return new AuthMiddleware(makeJwtAdapter(), new UserRepository());
};
