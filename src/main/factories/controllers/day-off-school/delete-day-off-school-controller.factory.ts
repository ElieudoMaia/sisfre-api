import { DeleteDayOffSchoolRequestValidator } from '@/presentation/api/controllers/day-off-school/delete/delete-day-off-school-request-validator';
import { DeleteDayOffSchoolController } from '@/presentation/api/controllers/day-off-school/delete/delete-day-off-school.controller';
import { makeDeleteDayOffSchoolUseCase } from '../../usecases/day-off-school/delete-day-off-school-usecase.factory';

export const makeDeleteDayOffSchoolController =
  (): DeleteDayOffSchoolController => {
    const validator = new DeleteDayOffSchoolRequestValidator();
    const usecase = makeDeleteDayOffSchoolUseCase();
    return new DeleteDayOffSchoolController(validator, usecase);
  };
