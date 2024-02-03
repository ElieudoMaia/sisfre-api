import { FindDayOffSchoolByIdRequestValidator } from '@/presentation/api/controllers/day-off-school/find-by-id/find-day-off-school-by-id-request-validator';
import { FindDayOffSchoolByIdController } from '@/presentation/api/controllers/day-off-school/find-by-id/find-day-off-school-by-id.controller';
import { makeFindDayOffSchoolByIdUsecase } from '../../usecases/day-off-school/find-day-off-school-by-id-usecase-factory';

export const makeFindDayOffSchoolByIdController =
  (): FindDayOffSchoolByIdController => {
    return new FindDayOffSchoolByIdController(
      new FindDayOffSchoolByIdRequestValidator(),
      makeFindDayOffSchoolByIdUsecase()
    );
  };
