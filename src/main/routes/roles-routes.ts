import { FastifyInstance } from 'fastify';
import { makeListRolesController } from '../factories/controllers/role/list-roles-controller.factory';

export default (server: FastifyInstance): void => {
  const ListRolesController = makeListRolesController();

  server.get('/roles', ListRolesController.handle.bind(ListRolesController));
};
