import { ListSchoolSaturdaysController } from '@/presentation/api/controllers/school-saturday/list/list-school-saturdays.controller';
import { makeListSchoolSaturdaysUseCase } from '../../usecases/school-saturday/list-school-saturdays-usecase.factory';

export const makeListSchoolSaturdaysController =
  (): ListSchoolSaturdaysController => {
    return new ListSchoolSaturdaysController(makeListSchoolSaturdaysUseCase());
  };
