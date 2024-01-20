import { CreateSemesterUseCase } from '@/application/usecases/semester/create/create-semester.usecase';
import { SemesterRepository } from '@/infrastructure/semester/repository/semester.repository';

export const makeCreateSemesterUseCase = (): CreateSemesterUseCase => {
  const semesterRepository = new SemesterRepository();
  return new CreateSemesterUseCase(semesterRepository, semesterRepository);
};
