import { ListClassesController } from '@/presentation/api/controllers/class/list/list-classes.controller';
import { makeListClassesUsecase } from '../../usecases/class/list-classes-usecase.factory';

export const makeListClassesController = (): ListClassesController => {
  const listClassesUsecase = makeListClassesUsecase();
  return new ListClassesController(listClassesUsecase);
};
