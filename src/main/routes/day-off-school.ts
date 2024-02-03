import { FastifyInstance } from 'fastify';
import { makeCreateDayOffSchoolController } from '../factories/controllers/day-off-school/create-day-off-school-controller.fatory';

export default (server: FastifyInstance): void => {
  const CreateDayOffSchoolController = makeCreateDayOffSchoolController();

  server.post(
    '/days-off-school',
    CreateDayOffSchoolController.handle.bind(CreateDayOffSchoolController)
  );
};
