import { FindDayOffSchoolByIdUseCase } from '@/application/usecases/day-off-school/find-by-id/find-day-off-school-by-id.usecase';
import { DayOffSchoolRepository } from '@/infrastructure/day-off-school/repository/day-off-school.repository';

export const makeFindDayOffSchoolByIdUsecase =
  (): FindDayOffSchoolByIdUseCase => {
    const repo = new DayOffSchoolRepository();
    return new FindDayOffSchoolByIdUseCase(repo);
  };
