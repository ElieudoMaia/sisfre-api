import { FastifyInstance } from 'fastify';
import { makeCreateCourseController } from '../factories/controllers/course/create-course-controller.factory';
import { makeListCoursesController } from '../factories/controllers/course/list-courses-controller.factory';
import { makeUpdateCourseController } from '../factories/controllers/course/update-course-controller.factory';

export default (server: FastifyInstance): void => {
  const CreateCourseController = makeCreateCourseController();
  const UpdateCourseController = makeUpdateCourseController();
  const ListCoursesController = makeListCoursesController();

  server.get(
    '/courses',
    ListCoursesController.handle.bind(ListCoursesController)
  );
  server.post(
    '/courses',
    CreateCourseController.handle.bind(CreateCourseController)
  );
  server.put(
    '/courses/:id',
    UpdateCourseController.handle.bind(UpdateCourseController)
  );
};
