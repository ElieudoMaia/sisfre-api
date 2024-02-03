import { UpdateDayOffSchoolUseCase } from '@/application/usecases/day-off-school/update/update-day-off-school.usecase';
import { DayOffSchoolType } from '@/domain/day-off-school/entity/day-off-school';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';
import { UpdateDayOffSchoolRequestValidator } from './update-day-off-school-request-validator';

type RequetBodyType = {
  description: string;
  type: string;
  dateBegin: string;
  dateEnd?: string;
};

type ParamsType = {
  id: string;
};

export class UpdateDayOffSchoolController {
  constructor(
    private readonly updateDayOffSchoolRequestValidator: UpdateDayOffSchoolRequestValidator,
    private readonly updateDayOffSchoolUseCase: UpdateDayOffSchoolUseCase
  ) {}

  async handle(
    request: FastifyRequest<{ Body: RequetBodyType; Params: ParamsType }>,
    reply: FastifyReply
  ) {
    try {
      const validatedData =
        await this.updateDayOffSchoolRequestValidator.validate({
          ...request.body,
          id: request.params.id
        });

      const updatedDayOffSchool = await this.updateDayOffSchoolUseCase.execute({
        id: validatedData.id,
        description: validatedData.description,
        type: validatedData.type as DayOffSchoolType,
        dateBegin: validatedData.dateBegin,
        dateEnd: validatedData.dateEnd
      });

      return reply.status(200).send({ ...updatedDayOffSchool });
    } catch (error) {
      const { statusCode, response } = handleControllerResponse(error as Error);
      return reply.status(statusCode).send(response);
    }
  }
}
