import { FindSemesterByIdUseCase } from '@/application/usecases/semester/find-by-id/find-semester-by-id.usecase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';
import { FindSemesterByIdRequestValidator } from './find-semester-by-id-request-validator';

type ParamsType = {
  id: string;
};

export class FindSemesterByIdController {
  constructor(
    private readonly findSemesterByIdRequestValidator: FindSemesterByIdRequestValidator,
    private readonly findSemesterByIdUseCase: FindSemesterByIdUseCase
  ) {}

  async handle(
    request: FastifyRequest<{ Params: ParamsType }>,
    reply: FastifyReply
  ) {
    try {
      const id = request.params.id;
      await this.findSemesterByIdRequestValidator.validate({ id });
      const semester = await this.findSemesterByIdUseCase.execute({ id });
      return reply.status(200).send(semester);
    } catch (error) {
      const { statusCode, response } = handleControllerResponse(error as Error);
      return reply.status(statusCode).send(response);
    }
  }
}
