import { FindUserByIdUseCase } from '@/application/usecases/user/find-by-id/find-user-by-id.usecase.dto';
import { ApplicationError } from '@/domain/@shared/error/application-error.error';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';
import { FindUserByIdRequestValidator } from './find-user-by-id-request-validator';

type ParamsType = {
  id: string;
};

export class FindUserByIdController {
  constructor(
    private readonly findUserByIdRequestValidator: FindUserByIdRequestValidator,
    private readonly findUserByIdUseCase: FindUserByIdUseCase
  ) {}

  async handle(
    request: FastifyRequest<{ Params: ParamsType }>,
    reply: FastifyReply
  ) {
    try {
      const id = request.params.id;
      await this.findUserByIdRequestValidator.validate({ id });
      const user = await this.findUserByIdUseCase.execute({ id });
      return reply.status(200).send(user);
    } catch (error: unknown) {
      const { statusCode, response } = handleControllerResponse(
        error as ApplicationError
      );
      return reply.status(statusCode).send(response);
    }
  }
}
