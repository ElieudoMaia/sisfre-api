import { CreateUserController } from '@/presentation/api/controllers/user/create-user.controller';
import { makeCreateUserUseCase } from '../../usecases/user/create-user-usecase.factory';

export const makeCreateUserController = (): CreateUserController => {
  return new CreateUserController(makeCreateUserUseCase());
};
