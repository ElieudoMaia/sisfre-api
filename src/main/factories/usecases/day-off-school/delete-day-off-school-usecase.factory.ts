import { DeleteDayOffSchoolUseCase } from '@/application/usecases/day-off-school/delete/delete-day-off-school.usecase';
import { DayOffSchoolRepository } from '@/infrastructure/day-off-school/repository/day-off-school.repository';

export const makeDeleteDayOffSchoolUseCase = (): DeleteDayOffSchoolUseCase => {
  const repo = new DayOffSchoolRepository();
  return new DeleteDayOffSchoolUseCase(repo, repo);
};
