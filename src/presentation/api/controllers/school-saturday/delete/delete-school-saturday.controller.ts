import { DeleteSchoolSaturdayUseCase } from '@/application/usecases/school-saturday/delete/delete-school-saturday.usecase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';
import { DeleteSchoolSaturdayRequestValidator } from './delete-school-saturday-request-validator';

type ParamsType = {
  id: string;
};

export class DeleteSchoolSaturdayController {
  constructor(
    private readonly deleteSchoolSaturdayRequestValidator: DeleteSchoolSaturdayRequestValidator,
    private readonly deleteSchoolSaturdayUseCase: DeleteSchoolSaturdayUseCase
  ) {}

  async handle(
    request: FastifyRequest<{ Params: ParamsType }>,
    reply: FastifyReply
  ) {
    try {
      const id = request.params.id;
      await this.deleteSchoolSaturdayRequestValidator.validate({ id });
      await this.deleteSchoolSaturdayUseCase.execute({ id });
      return reply.status(200).send();
    } catch (error) {
      const { statusCode, response } = handleControllerResponse(error as Error);
      return reply.status(statusCode).send(response);
    }
  }
}
