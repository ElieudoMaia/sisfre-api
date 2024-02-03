import { CreateDayOffSchoolUseCase } from '@/application/usecases/day-off-school/create/create-day-off-school.usecase';
import { DayOffSchoolRepository } from '@/infrastructure/day-off-school/repository/day-off-school.repository';

export const makeCreateDayOffSchoolUseCase = (): CreateDayOffSchoolUseCase => {
  const dayOffSchoolRepository = new DayOffSchoolRepository();
  return new CreateDayOffSchoolUseCase(
    dayOffSchoolRepository,
    dayOffSchoolRepository
  );
};
