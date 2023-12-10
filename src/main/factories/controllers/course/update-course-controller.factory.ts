import { UpdateCourseRequestValidator } from '@/presentation/api/controllers/course/update/update-course-request-validator';
import { UpdateCourseController } from '@/presentation/api/controllers/course/update/update-course.controller';
import { makeUpdateCourseUseCase } from '../../usecases/course/update-course-usecase.factory';

export const makeUpdateCourseController = (): UpdateCourseController => {
  return new UpdateCourseController(
    new UpdateCourseRequestValidator(),
    makeUpdateCourseUseCase()
  );
};
