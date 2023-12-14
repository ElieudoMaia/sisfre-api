import { ListCoursesController } from '@/presentation/api/controllers/course/list/list-courses.controller';
import { makeListCoursesUseCase } from '../../usecases/course/list-courses-usecase.factory';

export const makeListCoursesController = (): ListCoursesController => {
  const listCoursesUseCase = makeListCoursesUseCase();
  return new ListCoursesController(listCoursesUseCase);
};
