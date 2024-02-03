import { ListDaysOffSchoolUseCase } from '@/application/usecases/day-off-school/list/list-day-off-school.usecase';
import { DayOffSchoolRepository } from '@/infrastructure/day-off-school/repository/day-off-school.repository';

export const makeListDaysOffSchoolUseCase = (): ListDaysOffSchoolUseCase => {
  const repo = new DayOffSchoolRepository();
  return new ListDaysOffSchoolUseCase(repo);
};
