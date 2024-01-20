import { ListSemestersUseCase } from '@/application/usecases/semester/list/list-semesters.usecase';
import { SemesterRepository } from '@/infrastructure/semester/repository/semester.repository';

export const makeListSemestersUseCase = (): ListSemestersUseCase => {
  const semesterRepository = new SemesterRepository();
  return new ListSemestersUseCase(semesterRepository);
};
