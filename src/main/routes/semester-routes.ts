import { FastifyInstance } from 'fastify';
import { makeCreateSemesterController } from '../factories/controllers/semester/create-semester-controller.factory';

export default (server: FastifyInstance): void => {
  const CreateSemesterController = makeCreateSemesterController();

  server.post(
    '/semesters',
    CreateSemesterController.handle.bind(CreateSemesterController)
  );
};
