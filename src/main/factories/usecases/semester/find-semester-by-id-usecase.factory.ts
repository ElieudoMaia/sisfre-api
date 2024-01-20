import { FindSemesterByIdUseCase } from '@/application/usecases/semester/find-by-id/find-semester-by-id.usecase';
import { SemesterRepository } from '@/infrastructure/semester/repository/semester.repository';

export const makeFindSemesterByIdUseCase = (): FindSemesterByIdUseCase => {
  const semesterRepository = new SemesterRepository();
  return new FindSemesterByIdUseCase(semesterRepository);
};
