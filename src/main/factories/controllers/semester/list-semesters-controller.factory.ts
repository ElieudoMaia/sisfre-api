import { ListSemestersController } from '@/presentation/api/controllers/semester/list/list-semesters.controller';
import { makeListSemestersUseCase } from '../../usecases/semester/list-semesters-use-case.factory';

export const makeListSemestersController = (): ListSemestersController => {
  return new ListSemestersController(makeListSemestersUseCase());
};
