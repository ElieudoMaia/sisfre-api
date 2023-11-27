import { ListUsersUseCase } from '@/application/usecases/user/list/list-users.usecase';
import { UserRepository } from '@/infrastructure/user/repository/user.repository';

export const makeListUsersUseCase = (): ListUsersUseCase => {
  const userRepository = new UserRepository();
  const listUsersUseCase = new ListUsersUseCase(userRepository);
  return listUsersUseCase;
};
