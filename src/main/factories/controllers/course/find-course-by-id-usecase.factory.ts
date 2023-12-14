import { FindCourseByIdRequestValidator } from '@/presentation/api/controllers/course/find-by-id/find-course-by-id-request-validator';
import { FindCourseByIdController } from '@/presentation/api/controllers/course/find-by-id/find-course-by-id.controller';
import { makeFindCourseByIdUseCase } from '../../usecases/course/find-course-by-id-usecase.factory';

export const makeFindCourseByIdController = (): FindCourseByIdController => {
  const findCourseByIdUseCase = makeFindCourseByIdUseCase();
  return new FindCourseByIdController(
    new FindCourseByIdRequestValidator(),
    findCourseByIdUseCase
  );
};
