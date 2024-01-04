import { FastifyInstance } from 'fastify';
import { makeCreateSchoolSaturdayController } from '../factories/controllers/school-saturday/create-school-saturday-controller.factory';
import { makeListSchoolSaturdaysController } from '../factories/controllers/school-saturday/list-school-saturdays-controller.factory';
import { makeUpdateSchoolSaturdayController } from '../factories/controllers/school-saturday/update-school-saturday-controller.factory';

export default (server: FastifyInstance): void => {
  const CreateSchoolSaturdayController = makeCreateSchoolSaturdayController();
  const UpdateSchoolSaturdayController = makeUpdateSchoolSaturdayController();
  const ListSchoolSaturdaysController = makeListSchoolSaturdaysController();

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
};
