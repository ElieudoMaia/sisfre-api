import { CreateUserUseCase } from '@/application/usecases/user/create/create-user.usecase';
import { RoleRepository } from '@/infrastructure/role/repository/role.repository';
import { UserRepository } from '@/infrastructure/user/repository/user.repository';
import { makeBcryptHasherAdapter } from '../../gateways/bcrypt-adapter.factory';

export const makeCreateUserUseCase = (): CreateUserUseCase => {
  const roleRepository = new RoleRepository();
  const userRepository = new UserRepository();
  const encrypter = makeBcryptHasherAdapter();
  return new CreateUserUseCase(
    roleRepository,
    userRepository,
    userRepository,
    userRepository,
    encrypter
  );
};
