import { LoginUseCase } from '@/application/usecases/user/login/login.usecase';
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
    if (!request.body) {
      return reply.status(400).send({ message: 'No data provided' });
    }

    const { email, password } = request.body;
    const { accessToken } = await this.loginuseCase.execute({
      email,
      password
    });

    return reply.status(200).send({ accessToken });
  }
}
