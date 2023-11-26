import { FindUserByIdController } from '@/presentation/api/controllers/user/find-by-id/find-by-id.controller';
import { FindUserByIdRequestValidator } from '@/presentation/api/controllers/user/find-by-id/find-user-by-id-request-validator';
import { makeFindUserByidUseCase } from '../../usecases/user/find-user-by-id-usecase.factory';

export const makeFindUserByIdController = (): FindUserByIdController => {
  const findUserByIdController = new FindUserByIdController(
    new FindUserByIdRequestValidator(),
    makeFindUserByidUseCase()
  );
  return findUserByIdController;
};
