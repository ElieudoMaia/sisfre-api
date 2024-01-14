import { CreateUserUseCase } from '@/application/usecases/user/create/create-user.usecase';
import { UserRole } from '@/domain/user/entity/user';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';
import { CreateUserRequestValidator } from './create-user-request-validator';

type RequetBodyType = {
  name: string;
  nameAbbreviation: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: string;
};

export class CreateUserController {
  constructor(
    private readonly createUserRequestValidator: CreateUserRequestValidator,
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  async handle(
    request: FastifyRequest<{ Body: RequetBodyType }>,
    reply: FastifyReply
  ) {
    try {
      const validatedData = await this.createUserRequestValidator.validate(
        request.body
      );

      const createdUser = await this.createUserUseCase.execute({
        name: validatedData.name,
        nameAbbreviation: validatedData.nameAbbreviation,
        email: validatedData.email,
        password: validatedData.password,
        passwordConfirmation: validatedData.passwordConfirmation,
        role: validatedData.role as UserRole
      });

      return reply.status(201).send({ ...createdUser });
    } catch (error: unknown) {
      const { statusCode, response } = handleControllerResponse(error as Error);
      return reply.status(statusCode).send(response);
    }
  }
}
