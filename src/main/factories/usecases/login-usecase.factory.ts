import { LoginUseCase } from '@/application/usecases/user/login/login.usecase';
import { BcryptHasherAdapter } from '@/infrastructure/user/criptography/bcrypt-hasher-adapter';
import { JwtAdapter } from '@/infrastructure/user/criptography/jwt-adapter';
import { UserRepository } from '@/infrastructure/user/repository/user.repository';

export const makeLoginUseCase = (): LoginUseCase => {
  const userRepository = new UserRepository();
  const encrypter = new BcryptHasherAdapter();
  const tokenGenerator = new JwtAdapter('temporarysecret');
  return new LoginUseCase(userRepository, encrypter, tokenGenerator);
};
