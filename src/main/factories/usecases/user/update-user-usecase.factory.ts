import { UpdateUserUseCase } from '@/application/usecases/user/update/update-user.usecase';
import { UserRepository } from '@/infrastructure/user/repository/user.repository';

export const makeUpdateUserUseCase = (): UpdateUserUseCase => {
  const userRepository = new UserRepository();
  return new UpdateUserUseCase(
    userRepository,
    userRepository,
    userRepository,
    userRepository
  );
};
