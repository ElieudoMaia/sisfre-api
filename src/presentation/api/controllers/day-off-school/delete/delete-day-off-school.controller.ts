import { DeleteDayOffSchoolUseCase } from '@/application/usecases/day-off-school/delete/delete-day-off-school.usecase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';
import { DeleteDayOffSchoolRequestValidator } from './delete-day-off-school-request-validator';

type ParamsType = {
  id: string;
};

export class DeleteDayOffSchoolController {
  constructor(
    private readonly deleteDayOffSchoolRequestValidator: DeleteDayOffSchoolRequestValidator,
    private readonly deleteDayOffSchoolUseCase: DeleteDayOffSchoolUseCase
  ) {}

  async handle(
    request: FastifyRequest<{ Params: ParamsType }>,
    reply: FastifyReply
  ) {
    try {
      const id = request.params.id;
      await this.deleteDayOffSchoolRequestValidator.validate({ id });
      await this.deleteDayOffSchoolUseCase.execute({ id });
      return reply.status(200).send();
    } catch (error) {
      const { statusCode, response } = handleControllerResponse(error as Error);
      return reply.status(statusCode).send(response);
    }
  }
}
