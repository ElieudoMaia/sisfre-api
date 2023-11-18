import { CreateUserUseCase } from '@/application/usecases/user/create/create-user.usecase';
import { UserRepository } from '@/infrastructure/user/repository/user.repository';
import { makeBcryptHasherAdapter } from '../../gateways/bcrypt-adapter.factory';

export const makeCreateUserUseCase = (): CreateUserUseCase => {
  const userRepository = new UserRepository();
  const encrypter = makeBcryptHasherAdapter();
  return new CreateUserUseCase(
    userRepository,
    userRepository,
    userRepository,
    encrypter
  );
};
