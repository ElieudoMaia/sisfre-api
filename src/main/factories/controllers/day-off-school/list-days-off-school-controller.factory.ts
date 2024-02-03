import { ListDaysOffSchoolController } from '@/presentation/api/controllers/day-off-school/list/list-days-off-school.controller';
import { makeListDaysOffSchoolUseCase } from '../../usecases/day-off-school/list-days-off-school-usecase.factory';

export const makeListDaysOffSchoolController =
  (): ListDaysOffSchoolController => {
    const usecase = makeListDaysOffSchoolUseCase();
    return new ListDaysOffSchoolController(usecase);
  };
