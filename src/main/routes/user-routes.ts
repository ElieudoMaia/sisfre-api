import { FastifyInstance } from 'fastify';
import { makeLoginController } from '../factories/controllers/login-controller.factory';

export default (server: FastifyInstance): void => {
  const LoginController = makeLoginController();
  server.post('/login', LoginController.handle.bind(LoginController));
};
