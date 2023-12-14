import { FindCourseByIdUseCase } from '@/application/usecases/course/find-by-id/find-course-by-id.usecase';
import { CourseRepository } from '@/infrastructure/course/repository/course.repository';

export const makeFindCourseByIdUseCase = (): FindCourseByIdUseCase => {
  const findCourseByIdRepository = new CourseRepository();
  return new FindCourseByIdUseCase(findCourseByIdRepository);
};
