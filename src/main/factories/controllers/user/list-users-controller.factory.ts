import { ListUsersController } from '@/presentation/api/controllers/user/list/list-users.controller';
import { makeListUsersUseCase } from '../../usecases/user/list-users-usecase.factory';

export const makeListUsersController = (): ListUsersController => {
  const listUsersUseCase = makeListUsersUseCase();
  const listUsersController = new ListUsersController(listUsersUseCase);
  return listUsersController;
};
