import { UpdateUserRequestValidator } from '@/presentation/api/controllers/user/update/update-user-request-validator';
import { UpdateUserController } from '@/presentation/api/controllers/user/update/update-user.controller';
import { makeUpdateUserUseCase } from '../../usecases/user/update-user-usecase.factory';

export const makeUpdateUserController = (): UpdateUserController => {
  return new UpdateUserController(
    new UpdateUserRequestValidator(),
    makeUpdateUserUseCase()
  );
};
