import { LoginUseCase } from '@/application/usecases/user/login/login.usecase';
import { ApplicationError } from '@/domain/@shared/error/application-error.error';
import { FastifyReply, FastifyRequest } from 'fastify';

type RequetBodyType = {
  email: string;
  password: string;
};

export class LoginController {
  constructor(private readonly loginuseCase: LoginUseCase) {}

  async handle(
    request: FastifyRequest<{ Body: RequetBodyType }>,
    reply: FastifyReply
  ) {
    try {
      if (!request.body) {
        return reply.status(400).send({ message: 'No data provided' });
      }

      const { email, password } = request.body;
      const { accessToken } = await this.loginuseCase.execute({
        email,
        password
      });

      return reply.status(200).send({ accessToken });
    } catch (error: unknown) {
      const isApplicationError = error instanceof ApplicationError;
      const statusCode = isApplicationError ? 400 : 500;

      const err = error as Error;

      err.message = isApplicationError
        ? error.message
        : 'Internal Server Error';

      return reply.status(statusCode).send(error);
    }
  }
}
