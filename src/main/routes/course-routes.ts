import { FastifyInstance } from 'fastify';
import { makeCreateCourseController } from '../factories/controllers/course/create-course-controller.factory';
import { makeUpdateCourseController } from '../factories/controllers/course/update-course-controller.factory';

export default (server: FastifyInstance): void => {
  const CreateCourseController = makeCreateCourseController();
  const UpdateCourseController = makeUpdateCourseController();

  server.post(
    '/courses',
    CreateCourseController.handle.bind(CreateCourseController)
  );
  server.put(
    '/courses/:id',
    UpdateCourseController.handle.bind(UpdateCourseController)
  );
};
