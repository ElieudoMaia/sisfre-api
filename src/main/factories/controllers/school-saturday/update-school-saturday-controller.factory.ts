import { UpdateSchoolSaturdayRequestValidator } from '@/presentation/api/controllers/school-saturday/update/update-school-saturday-request-validator';
import { UpdateSchoolSaturdayController } from '@/presentation/api/controllers/school-saturday/update/update-school-saturday.controller';
import { makeUpdateSchoolSaturdayUseCase } from '../../usecases/school-saturday/update-school-saturday-usecase.factory';

export const makeUpdateSchoolSaturdayController =
  (): UpdateSchoolSaturdayController => {
    return new UpdateSchoolSaturdayController(
      new UpdateSchoolSaturdayRequestValidator(),
      makeUpdateSchoolSaturdayUseCase()
    );
  };
