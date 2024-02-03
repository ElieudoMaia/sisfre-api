import { UpdateDayOffSchoolUseCase } from '@/application/usecases/day-off-school/update/update-day-off-school.usecase';
import { DayOffSchoolRepository } from '@/infrastructure/day-off-school/repository/day-off-school.repository';

export const makeUpdateDayOffSchoolUsecase = (): UpdateDayOffSchoolUseCase => {
  const repo = new DayOffSchoolRepository();
  return new UpdateDayOffSchoolUseCase(repo, repo, repo);
};
