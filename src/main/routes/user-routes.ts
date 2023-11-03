import { FastifyInstance } from 'fastify';
import { makeCreateUserController } from '../factories/controllers/user/create-user-controller.factory';
import { makeLoginController } from '../factories/controllers/user/login-controller.factory';

export default (server: FastifyInstance): void => {
  const LoginController = makeLoginController();
  const CreateUserController = makeCreateUserController();

  server.post('/login', LoginController.handle.bind(LoginController));
  server.post('/users', CreateUserController.handle.bind(CreateUserController));
};
