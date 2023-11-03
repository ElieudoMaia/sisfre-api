import { CreateUserUseCase } from '@/application/usecases/user/create/create-user.usecase';
import { ApplicationError } from '@/domain/@shared/error/application-error.error';
import { FastifyReply, FastifyRequest } from 'fastify';

type RequetBodyType = {
  name: string;
  nameAbbreviation: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  roleId: string;
};

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async handle(
    request: FastifyRequest<{ Body: RequetBodyType }>,
    reply: FastifyReply
  ) {
    try {
      if (!request.body) {
        return reply.status(400).send({ message: 'No data provided' });
      }

      const data = request.body;

      const createdUser = await this.createUserUseCase.execute({
        name: data.name,
        nameAbreviation: data.nameAbbreviation,
        email: data.email,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
        roleId: data.roleId
      });

      return reply.status(201).send({ createdUser });
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
