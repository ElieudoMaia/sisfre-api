import { DeleteClassUseCase } from '@/application/usecases/class/delete/delete-class.usecase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';
import { DeleteClassRequestValidator } from './delete-class-request-validator';

type ParamsType = {
  id: string;
};

export class DeleteClassController {
  constructor(
    private readonly deleteClassRequestValidator: DeleteClassRequestValidator,
    private readonly deleteClassUseCase: DeleteClassUseCase
  ) {}

  async handle(
    request: FastifyRequest<{ Params: ParamsType }>,
    reply: FastifyReply
  ) {
    try {
      const id = request.params.id;
      await this.deleteClassRequestValidator.validate({ id });
      await this.deleteClassUseCase.execute({ id });
      return reply.status(200).send();
    } catch (error) {
      const { statusCode, response } = handleControllerResponse(error as Error);
      return reply.status(statusCode).send(response);
    }
  }
}
