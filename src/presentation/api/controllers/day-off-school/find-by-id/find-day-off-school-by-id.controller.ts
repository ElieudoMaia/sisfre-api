import { FindDayOffSchoolByIdUseCase } from '@/application/usecases/day-off-school/find-by-id/find-day-off-school-by-id.usecase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';
import { FindDayOffSchoolByIdRequestValidator } from './find-day-off-school-by-id-request-validator';

type ParamsType = {
  id: string;
};

export class FindDayOffSchoolByIdController {
  constructor(
    private readonly findDayOffSchoolByIdRequestValidator: FindDayOffSchoolByIdRequestValidator,
    private readonly findDayOffSchoolByIdUseCase: FindDayOffSchoolByIdUseCase
  ) {}

  async handle(
    request: FastifyRequest<{ Params: ParamsType }>,
    reply: FastifyReply
  ) {
    try {
      const id = request.params.id;
      await this.findDayOffSchoolByIdRequestValidator.validate({ id });
      const dayOffSchool = await this.findDayOffSchoolByIdUseCase.execute({
        id
      });
      return reply.status(200).send(dayOffSchool);
    } catch (error) {
      const { statusCode, response } = handleControllerResponse(error as Error);
      return reply.status(statusCode).send(response);
    }
  }
}
