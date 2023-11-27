import { FindUserByIdUseCase } from '@/application/usecases/user/find-by-id/find-user-by-id.usecase';
import { UserRepository } from '@/infrastructure/user/repository/user.repository';

export const makeFindUserByidUseCase = (): FindUserByIdUseCase => {
  const userRepository = new UserRepository();
  const findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
  return findUserByIdUseCase;
};
