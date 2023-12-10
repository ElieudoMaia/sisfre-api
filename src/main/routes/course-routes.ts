import { FastifyInstance } from 'fastify';
import { makeCreateCourseController } from '../factories/controllers/course/create-course-controller.factory';

export default (server: FastifyInstance): void => {
  const CreateCourseController = makeCreateCourseController();

  server.post(
    '/courses',
    CreateCourseController.handle.bind(CreateCourseController)
  );
};
