import { FastifyInstance } from 'fastify';
import { makeCreateClassController } from '../factories/controllers/class/create-class-controller.factory';
import { makeDeleteClassController } from '../factories/controllers/class/delete-class-controller.factory';
import { makeFindClassByIdController } from '../factories/controllers/class/find-class-by-id-controller.factory';
import { makeListClassesController } from '../factories/controllers/class/list-classes-controller.factory';
import { makeUpdateClassController } from '../factories/controllers/class/update-class-controller.factory';

export default (server: FastifyInstance): void => {
  const CreateClassController = makeCreateClassController();
  const UpdateClassController = makeUpdateClassController();
  const ListClassesController = makeListClassesController();
  const FindClassByIdController = makeFindClassByIdController();
  const DeleteClassController = makeDeleteClassController();

  server.get(
    '/classes',
    ListClassesController.handle.bind(ListClassesController)
  );
  server.get(
    '/classes/:id',
    FindClassByIdController.handle.bind(FindClassByIdController)
  );
  server.post(
    '/classes',
    CreateClassController.handle.bind(CreateClassController)
  );
  server.put(
    '/classes/:id',
    UpdateClassController.handle.bind(UpdateClassController)
  );
  server.delete(
    '/classes/:id',
    DeleteClassController.handle.bind(DeleteClassController)
  );
};
