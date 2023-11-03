import { LoginUseCase } from '@/application/usecases/user/login/login.usecase';
import { UserRepository } from '@/infrastructure/user/repository/user.repository';
import { makeBcryptHasherAdapter } from '../../gateways/bcrypt-adapter.factory';
import { makeJwtAdapter } from '../../gateways/jwt-adapter.factory';

export const makeLoginUseCase = (): LoginUseCase => {
  const userRepository = new UserRepository();
  const encrypter = makeBcryptHasherAdapter();
  const tokenGenerator = makeJwtAdapter();
  return new LoginUseCase(userRepository, encrypter, tokenGenerator);
};
