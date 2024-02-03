import { FastifyInstance } from 'fastify';
import { makeCreateDayOffSchoolController } from '../factories/controllers/day-off-school/create-day-off-school-controller.fatory';
import { makeFindDayOffSchoolByIdController } from '../factories/controllers/day-off-school/find-day-off-school-controller.factory';
import { makeUpdateDayOffSchoolController } from '../factories/controllers/day-off-school/update-dat-off-school-controller.fatory';

export default (server: FastifyInstance): void => {
  const CreateDayOffSchoolController = makeCreateDayOffSchoolController();
  const UpdateDayOffSchoolController = makeUpdateDayOffSchoolController();
  const FindDayOffSchoolByIdController = makeFindDayOffSchoolByIdController();

  server.post(
    '/days-off-school',
    CreateDayOffSchoolController.handle.bind(CreateDayOffSchoolController)
  );
  server.put(
    '/days-off-school/:id',
    UpdateDayOffSchoolController.handle.bind(UpdateDayOffSchoolController)
  );
  server.get(
    '/days-off-school/:id',
    FindDayOffSchoolByIdController.handle.bind(FindDayOffSchoolByIdController)
  );
};
