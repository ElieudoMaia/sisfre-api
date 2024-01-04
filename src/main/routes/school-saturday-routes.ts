import { FastifyInstance } from 'fastify';
import { makeCreateSchoolSaturdayController } from '../factories/controllers/school-saturday/create-school-saturday-controller.factory';
import { makeUpdateSchoolSaturdayController } from '../factories/controllers/school-saturday/update-school-saturday-controller.factory';

export default (server: FastifyInstance): void => {
  const CreateSchoolSaturdayController = makeCreateSchoolSaturdayController();
  const UpdateSchoolSaturdayController = makeUpdateSchoolSaturdayController();

  server.post(
    '/school-saturdays',
    CreateSchoolSaturdayController.handle.bind(CreateSchoolSaturdayController)
  );
  server.put(
    '/school-saturdays/:id',
    UpdateSchoolSaturdayController.handle.bind(UpdateSchoolSaturdayController)
  );
};
