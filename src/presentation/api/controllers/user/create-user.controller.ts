import { CreateUserUseCase } from '@/application/usecases/user/create/create-user.usecase';
import { ApplicationError } from '@/domain/@shared/error/application-error.error';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../@shared/handle-controller-response';

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
      const { statusCode, response } = handleControllerResponse(
        error as ApplicationError
      );
      return reply.status(statusCode).send(response);
    }
  }
}
