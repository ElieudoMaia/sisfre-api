import { ListCoursesUseCase } from '@/application/usecases/course/list/list-courses.usecase';
import { CourseRepository } from '@/infrastructure/course/repository/course.repository';

export const makeListCoursesUseCase = (): ListCoursesUseCase => {
  const listCoursesRepository = new CourseRepository();
  return new ListCoursesUseCase(listCoursesRepository);
};
