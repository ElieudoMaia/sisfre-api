import { FastifyInstance } from 'fastify';
import { makeCreateSemesterController } from '../factories/controllers/semester/create-semester-controller.factory';
import { makeListSemestersController } from '../factories/controllers/semester/list-semesters-controller.factory';
import { makeUpdateSemesterController } from '../factories/controllers/semester/update-semester-controller.factory';

export default (server: FastifyInstance): void => {
  const CreateSemesterController = makeCreateSemesterController();
  const UpdateSemesterController = makeUpdateSemesterController();
  const ListSemestersController = makeListSemestersController();

  server.get(
    '/semesters',
    ListSemestersController.handle.bind(ListSemestersController)
  );
  server.post(
    '/semesters',
    CreateSemesterController.handle.bind(CreateSemesterController)
  );
  server.put(
    '/semesters/:id',
    UpdateSemesterController.handle.bind(UpdateSemesterController)
  );
};
