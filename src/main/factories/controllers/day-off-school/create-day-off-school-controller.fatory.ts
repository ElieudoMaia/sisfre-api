import { CreateDayOffSchoolRequestValidator } from '@/presentation/api/controllers/day-off-school/create/create-day-off-school-request-validator';
import { CreateDayOffSchoolController } from '@/presentation/api/controllers/day-off-school/create/create-day-off-school.controller';
import { makeCreateDayOffSchoolUseCase } from '../../usecases/day-off-school/create-day-off-school-usecase.factory';

export const makeCreateDayOffSchoolController =
  (): CreateDayOffSchoolController => {
    return new CreateDayOffSchoolController(
      new CreateDayOffSchoolRequestValidator(),
      makeCreateDayOffSchoolUseCase()
    );
  };
