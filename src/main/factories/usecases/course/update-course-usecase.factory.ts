import { UpdateCourseUsecase } from '@/application/usecases/course/update/update-course.usecase';
import { CourseRepository } from '@/infrastructure/course/repository/course.repository';
import { UserRepository } from '@/infrastructure/user/repository/user.repository';

export const makeUpdateCourseUseCase = (): UpdateCourseUsecase => {
  const courseRepository = new CourseRepository();
  const updateCourseUseCase = new UpdateCourseUsecase(
    courseRepository,
    new UserRepository(),
    courseRepository,
    courseRepository,
    courseRepository
  );

  return updateCourseUseCase;
};
