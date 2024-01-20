import { UpdateSemesterUseCase } from '@/application/usecases/semester/update/update-semester.usecase';
import { SemesterRepository } from '@/infrastructure/semester/repository/semester.repository';

export const makeUpdateSemesterUseCase = (): UpdateSemesterUseCase => {
  const semesterRepository = new SemesterRepository();
  return new UpdateSemesterUseCase(
    semesterRepository,
    semesterRepository,
    semesterRepository
  );
};
