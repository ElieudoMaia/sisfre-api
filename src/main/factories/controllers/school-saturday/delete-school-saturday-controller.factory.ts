import { DeleteSchoolSaturdayRequestValidator } from '@/presentation/api/controllers/school-saturday/delete/delete-school-saturday-request-validator';
import { DeleteSchoolSaturdayController } from '@/presentation/api/controllers/school-saturday/delete/delete-school-saturday.controller';
import { makeDeleteSchoolSaturdayUsecase } from '../../usecases/school-saturday/delete-school-saturday-usecase.factory';

export const makeDeleteSchoolSaturdayControllerFactory =
  (): DeleteSchoolSaturdayController => {
    return new DeleteSchoolSaturdayController(
      new DeleteSchoolSaturdayRequestValidator(),
      makeDeleteSchoolSaturdayUsecase()
    );
  };
