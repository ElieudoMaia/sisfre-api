import { FindClassByIdUseCase } from '@/application/usecases/class/find-by-id/find-class-by-id.usecase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';
import { FindClassByIdRequestValidator } from './find-class-by-id-request-validator';

type ParamsType = {
  id: string;
};

export class FindClassByIdController {
  constructor(
    private readonly findClassByIdRequestValidator: FindClassByIdRequestValidator,
    private readonly findClassByIdUseCase: FindClassByIdUseCase
  ) {}

  async handle(
    request: FastifyRequest<{ Params: ParamsType }>,
    reply: FastifyReply
  ) {
    try {
      const id = request.params.id;
      await this.findClassByIdRequestValidator.validate({ id });
      const schoolClass = await this.findClassByIdUseCase.execute({
        id
      });
      return reply.status(200).send(schoolClass);
    } catch (error) {
      const { statusCode, response } = handleControllerResponse(error as Error);
      return reply.status(statusCode).send(response);
    }
  }
}
