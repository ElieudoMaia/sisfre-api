import { CreateCourseUseCase } from '@/application/usecases/course/create/create-course.usecase';
import { CourseRepository } from '@/infrastructure/course/repository/course.repository';
import { UserRepository } from '@/infrastructure/user/repository/user.repository';

export const makeCreateCourseUseCase = (): CreateCourseUseCase => {
  const courseRepository = new CourseRepository();
  const createCourseUseCase = new CreateCourseUseCase(
    new UserRepository(),
    courseRepository,
    courseRepository,
    courseRepository
  );
  return createCourseUseCase;
};
