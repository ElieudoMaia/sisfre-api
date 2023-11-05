import { CreateUserRequestValidator } from '@/presentation/api/controllers/user/create/create-user-request-validator';
import { CreateUserController } from '@/presentation/api/controllers/user/create/create-user.controller';
import { makeCreateUserUseCase } from '../../usecases/user/create-user-usecase.factory';

export const makeCreateUserController = (): CreateUserController => {
  return new CreateUserController(
    new CreateUserRequestValidator(),
    makeCreateUserUseCase()
  );
};
