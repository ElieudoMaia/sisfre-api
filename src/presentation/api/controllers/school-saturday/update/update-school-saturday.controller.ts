import { UpdateSchoolSaturdayUseCase } from '@/application/usecases/school-saturday/update/update-school-saturday.usecase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';
import { UpdateSchoolSaturdayRequestValidator } from './update-school-saturday-request-validator';

type RequetBodyType = {
  date: string;
  dayOfWeek: string;
};

type ParamsType = {
  id: string;
};

export class UpdateSchoolSaturdayController {
  constructor(
    private readonly updateSchoolSaturdayRequestValidator: UpdateSchoolSaturdayRequestValidator,
    private readonly updateSchoolSaturdayUseCase: UpdateSchoolSaturdayUseCase
  ) {}

  async handle(
    request: FastifyRequest<{ Body: RequetBodyType; Params: ParamsType }>,
    reply: FastifyReply
  ) {
    try {
      const validatedData =
        await this.updateSchoolSaturdayRequestValidator.validate({
          ...request.body,
          id: request.params.id
        });

      const updatedSchoolSaturday =
        await this.updateSchoolSaturdayUseCase.execute({
          id: validatedData.id,
          date: new Date(validatedData.date),
          dayOfWeek: validatedData.dayOfWeek
        });

      return reply.status(200).send({ ...updatedSchoolSaturday });
    } catch (error) {
      const { statusCode, response } = handleControllerResponse(error as Error);
      return reply.status(statusCode).send(response);
    }
  }
}
