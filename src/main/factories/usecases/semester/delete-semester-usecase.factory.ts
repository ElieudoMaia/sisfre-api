import { DeleteSemesterUseCase } from '@/application/usecases/semester/delete/delete-semester.usecase';
import { SemesterRepository } from '@/infrastructure/semester/repository/semester.repository';

export const makeDeleteSemesterUseCase = (): DeleteSemesterUseCase => {
  const semesterRepository = new SemesterRepository();
  return new DeleteSemesterUseCase(semesterRepository, semesterRepository);
};
