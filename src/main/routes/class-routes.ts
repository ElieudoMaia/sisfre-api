import { FastifyInstance } from 'fastify';
import { makeCreateClassController } from '../factories/controllers/class/create-class-controller.factory';

export default (server: FastifyInstance): void => {
  const CreateClassController = makeCreateClassController();

  server.post(
    '/classes',
    CreateClassController.handle.bind(CreateClassController)
  );
};
