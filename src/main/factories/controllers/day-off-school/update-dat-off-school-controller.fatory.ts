import { UpdateDayOffSchoolRequestValidator } from '@/presentation/api/controllers/day-off-school/update/update-day-off-school-request-validator';
import { UpdateDayOffSchoolController } from '@/presentation/api/controllers/day-off-school/update/update-day-off-school.controller';
import { makeUpdateDayOffSchoolUsecase } from '../../usecases/day-off-school/update-day-off-school-usecase.factory';

export const makeUpdateDayOffSchoolController =
  (): UpdateDayOffSchoolController => {
    return new UpdateDayOffSchoolController(
      new UpdateDayOffSchoolRequestValidator(),
      makeUpdateDayOffSchoolUsecase()
    );
  };
