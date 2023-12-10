import { CreateCourseRequestValidator } from '@/presentation/api/controllers/course/create/create-course-request-validator';
import { CreateCourseController } from '@/presentation/api/controllers/course/create/create-course.controller';
import { makeCreateCourseUseCase } from '../../usecases/course/create-course-usecase.factory';

export const makeCreateCourseController = (): CreateCourseController => {
  const createCourseController = new CreateCourseController(
    new CreateCourseRequestValidator(),
    makeCreateCourseUseCase()
  );
  return createCourseController;
};
