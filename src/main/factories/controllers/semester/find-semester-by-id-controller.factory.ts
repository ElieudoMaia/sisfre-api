import { FindSemesterByIdRequestValidator } from '@/presentation/api/controllers/semester/find-by-id/find-semester-by-id-request-validator';
import { FindSemesterByIdController } from '@/presentation/api/controllers/semester/find-by-id/find-semester-by-id.controller';
import { makeFindSemesterByIdUseCase } from '../../usecases/semester/find-semester-by-id-usecase.factory';

export const makeFindSemesterByIdController =
  (): FindSemesterByIdController => {
    return new FindSemesterByIdController(
      new FindSemesterByIdRequestValidator(),
      makeFindSemesterByIdUseCase()
    );
  };
