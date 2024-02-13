import { CreateClassRequestValidator } from '@/presentation/api/controllers/class/create/create-class-request-validator';
import { CreateClassController } from '@/presentation/api/controllers/class/create/create-class.controller';
import { makeCreateClassUseCase } from '../../usecases/class/create-class-usecase.factory';

export const makeCreateClassController = (): CreateClassController => {
  return new CreateClassController(
    new CreateClassRequestValidator(),
    makeCreateClassUseCase()
  );
};
