import { FastifyInstance } from 'fastify';
import { makeCreateSemesterController } from '../factories/controllers/semester/create-semester-controller.factory';
import { makeFindSemesterByIdController } from '../factories/controllers/semester/find-semester-by-id-controller.factory';
import { makeListSemestersController } from '../factories/controllers/semester/list-semesters-controller.factory';
import { makeUpdateSemesterController } from '../factories/controllers/semester/update-semester-controller.factory';

export default (server: FastifyInstance): void => {
  const CreateSemesterController = makeCreateSemesterController();
  const UpdateSemesterController = makeUpdateSemesterController();
  const ListSemestersController = makeListSemestersController();
  const FindSemesterByIdController = makeFindSemesterByIdController();

  server.get(
    '/semesters',
    ListSemestersController.handle.bind(ListSemestersController)
  );
  server.get(
    '/semesters/:id',
    FindSemesterByIdController.handle.bind(FindSemesterByIdController)
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
