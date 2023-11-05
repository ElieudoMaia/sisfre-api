import { LoginUseCase } from '@/application/usecases/user/login/login.usecase';
import { ApplicationError } from '@/domain/@shared/error/application-error.error';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';
import { LoginRequestValidator } from './login-request-validator';

type RequetBodyType = {
  email: string;
  password: string;
};

export class LoginController {
  constructor(
    private readonly loginRequestValidator: LoginRequestValidator,
    private readonly loginuseCase: LoginUseCase
  ) {}

  async handle(
    request: FastifyRequest<{ Body: RequetBodyType }>,
    reply: FastifyReply
  ) {
    try {
      const validatedData = await this.loginRequestValidator.validate(
        request.body
      );

      const { email, password } = validatedData;
      const { accessToken } = await this.loginuseCase.execute({
        email,
        password
      });

      return reply.status(200).send({ accessToken });
    } catch (error: unknown) {
      const { statusCode, response } = handleControllerResponse(
        error as ApplicationError
      );
      return reply.status(statusCode).send(response);
    }
  }
}
