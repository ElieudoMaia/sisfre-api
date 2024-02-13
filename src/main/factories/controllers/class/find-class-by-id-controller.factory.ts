import { FindClassByIdRequestValidator } from '@/presentation/api/controllers/class/find-by-id/find-class-by-id-request-validator';
import { FindClassByIdController } from '@/presentation/api/controllers/class/find-by-id/find-class-by-id.controller';
import { makeFindClassByIdUseCase } from '../../usecases/class/find-class-by-id-usecase.factory';

export const makeFindClassByIdController = (): FindClassByIdController => {
  const findClassByIdUseCase = makeFindClassByIdUseCase();
  return new FindClassByIdController(
    new FindClassByIdRequestValidator(),
    findClassByIdUseCase
  );
};
