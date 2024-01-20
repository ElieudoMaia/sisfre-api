import { UpdateSemesterRequestValidator } from '@/presentation/api/controllers/semester/update/update-semester-request-validator';
import { UpdateSemesterController } from '@/presentation/api/controllers/semester/update/update-semester.controller';
import { makeUpdateSemesterUseCase } from '../../usecases/semester/update-semester-usecase.factory';

export const makeUpdateSemesterController = (): UpdateSemesterController => {
  return new UpdateSemesterController(
    new UpdateSemesterRequestValidator(),
    makeUpdateSemesterUseCase()
  );
};
