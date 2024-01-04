import { FastifyInstance } from 'fastify';
import { makeCreateSchoolSaturdayController } from '../factories/controllers/school-saturday/create-school-saturday-controller.factory';
import { makeDeleteSchoolSaturdayControllerFactory } from '../factories/controllers/school-saturday/delete-school-saturday-controller.factory';
import { makeFindSchoolSaturdayByIdController } from '../factories/controllers/school-saturday/find-school-satuday-controller.factory';
import { makeListSchoolSaturdaysController } from '../factories/controllers/school-saturday/list-school-saturdays-controller.factory';
import { makeUpdateSchoolSaturdayController } from '../factories/controllers/school-saturday/update-school-saturday-controller.factory';

export default (server: FastifyInstance): void => {
  const CreateSchoolSaturdayController = makeCreateSchoolSaturdayController();
  const UpdateSchoolSaturdayController = makeUpdateSchoolSaturdayController();
  const ListSchoolSaturdaysController = makeListSchoolSaturdaysController();
  const FindSchoolSaturdayByIdController =
    makeFindSchoolSaturdayByIdController();
  const DeleteSchoolSaturdayController =
    makeDeleteSchoolSaturdayControllerFactory();

  server.post(
    '/school-saturdays',
    CreateSchoolSaturdayController.handle.bind(CreateSchoolSaturdayController)
  );
  server.put(
    '/school-saturdays/:id',
    UpdateSchoolSaturdayController.handle.bind(UpdateSchoolSaturdayController)
  );
  server.get(
    '/school-saturdays',
    ListSchoolSaturdaysController.handle.bind(ListSchoolSaturdaysController)
  );
  server.get(
    '/school-saturdays/:id',
    FindSchoolSaturdayByIdController.handle.bind(
      FindSchoolSaturdayByIdController
    )
  );
  server.delete(
    '/school-saturdays/:id',
    DeleteSchoolSaturdayController.handle.bind(DeleteSchoolSaturdayController)
  );
};
