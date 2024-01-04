import { FastifyInstance } from 'fastify';
import { makeCreateSchoolSaturdayController } from '../factories/controllers/school-saturday/create-school-saturday-controller.factory';

export default (server: FastifyInstance): void => {
  const CreateSchoolSaturdayController = makeCreateSchoolSaturdayController();

  server.post(
    '/school-saturdays',
    CreateSchoolSaturdayController.handle.bind(CreateSchoolSaturdayController)
  );
};
