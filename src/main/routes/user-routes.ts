import { FastifyInstance } from 'fastify';
import { makeCreateUserController } from '../factories/controllers/user/create-user-controller.factory';
import { makeFindUserByIdController } from '../factories/controllers/user/find-user-by-id-controller.factory';
import { makeLoginController } from '../factories/controllers/user/login-controller.factory';

export default (server: FastifyInstance): void => {
  const LoginController = makeLoginController();
  const CreateUserController = makeCreateUserController();
  const FindUserByIdController = makeFindUserByIdController();

  server.post('/login', LoginController.handle.bind(LoginController));
  server.post('/users', CreateUserController.handle.bind(CreateUserController));
  server.get(
    '/users/:id',
    FindUserByIdController.handle.bind(FindUserByIdController)
  );
};
