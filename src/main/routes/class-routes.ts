import { FastifyInstance } from 'fastify';
import { makeCreateClassController } from '../factories/controllers/class/create-class-controller.factory';
import { makeUpdateClassController } from '../factories/controllers/class/update-class-controller.factory';

export default (server: FastifyInstance): void => {
  const CreateClassController = makeCreateClassController();
  const UpdateClassController = makeUpdateClassController();

  server.post(
    '/classes',
    CreateClassController.handle.bind(CreateClassController)
  );
  server.put(
    '/classes/:id',
    UpdateClassController.handle.bind(UpdateClassController)
  );
};
