import { CreateSchoolSaturdayRequestValidator } from '@/presentation/api/controllers/school-saturday/create/create-school-saturday-request-validator';
import { CreateSchoolSaturdayController } from '@/presentation/api/controllers/school-saturday/create/create-school-saturday.controller';
import { makeCreateSchoolSaturdayUseCase } from '../../usecases/school-saturday/create-school-saturday-usecase.factory';

export const makeCreateSchoolSaturdayController =
  (): CreateSchoolSaturdayController => {
    return new CreateSchoolSaturdayController(
      new CreateSchoolSaturdayRequestValidator(),
      makeCreateSchoolSaturdayUseCase()
    );
  };
