import { FindSchoolSaturdayByIdRequestValidator } from '@/presentation/api/controllers/school-saturday/find-by-id/find-school-saturday-by-id-request-validator';
import { FindSchoolSaturdayByIdController } from '@/presentation/api/controllers/school-saturday/find-by-id/find-school-saturday-by-id.controller';
import { makeFindSchoolSaturdayByIdUseCase } from '../../usecases/school-saturday/find-school-saturday-by-id-usecase.factory';

export const makeFindSchoolSaturdayByIdController =
  (): FindSchoolSaturdayByIdController => {
    return new FindSchoolSaturdayByIdController(
      new FindSchoolSaturdayByIdRequestValidator(),
      makeFindSchoolSaturdayByIdUseCase()
    );
  };
