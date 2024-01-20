import { CreateSemesterRequestValidator } from '@/presentation/api/controllers/semester/create/create-semester-request-validator';
import { CreateSemesterController } from '@/presentation/api/controllers/semester/create/create-semester.controller';
import { makeCreateSemesterUseCase } from '../../usecases/semester/create-semester-usecase.factory';

export const makeCreateSemesterController = (): CreateSemesterController => {
  return new CreateSemesterController(
    new CreateSemesterRequestValidator(),
    makeCreateSemesterUseCase()
  );
};
