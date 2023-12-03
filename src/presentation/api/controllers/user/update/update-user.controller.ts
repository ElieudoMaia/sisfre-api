import { UpdateUserUseCase } from '@/application/usecases/user/update/update-user.usecase';
import { ApplicationError } from '@/domain/@shared/error/application-error.error';
import { UserRole } from '@/domain/user/entity/user';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';
import { UpdateUserRequestValidator } from './update-user-request-validator';

type RequetBodyType = {
  name: string;
  nameAbbreviation: string;
  email: string;
  role: string;
};

type RequestParamsType = {
  id: string;
};

export class UpdateUserController {
  constructor(
    private readonly updateUserRequestValidator: UpdateUserRequestValidator,
    private readonly updateUserUseCase: UpdateUserUseCase
  ) {}

  async handle(
    request: FastifyRequest<{
      Body: RequetBodyType;
      Params: RequestParamsType;
    }>,
    reply: FastifyReply
  ) {
    try {
      const validatedData = await this.updateUserRequestValidator.validate({
        ...request.body,
        ...request.params
      });

      const updatedUser = await this.updateUserUseCase.execute({
        id: request.params.id,
        name: validatedData.name,
        email: validatedData.email,
        nameAbbreviation: validatedData.nameAbbreviation,
        role: validatedData.role as UserRole
      });

      return reply.status(200).send({ ...updatedUser });
    } catch (error: unknown) {
      const { statusCode, response } = handleControllerResponse(
        error as ApplicationError
      );
      return reply.status(statusCode).send(response);
    }
  }
}
