import { FindSchoolSaturdayByIdUseCase } from '@/application/usecases/school-saturday/find-by-id/find-school-saturday-by-id.usecase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';
import { FindSchoolSaturdayByIdRequestValidator } from './find-school-saturday-by-id-request-validator';

type ParamsType = {
  id: string;
};

export class FindSchoolSaturdayByIdController {
  constructor(
    private readonly findSchoolSaturdayByIdRequestValidator: FindSchoolSaturdayByIdRequestValidator,
    private readonly findSchoolSaturdayByIdUseCase: FindSchoolSaturdayByIdUseCase
  ) {}

  async handle(
    request: FastifyRequest<{ Params: ParamsType }>,
    reply: FastifyReply
  ) {
    try {
      const id = request.params.id;
      await this.findSchoolSaturdayByIdRequestValidator.validate({ id });
      const schoolSaturday = await this.findSchoolSaturdayByIdUseCase.execute({
        id
      });
      return reply.status(200).send(schoolSaturday);
    } catch (error) {
      const { statusCode, response } = handleControllerResponse(error as Error);
      return reply.status(statusCode).send(response);
    }
  }
}
