import { CreateDayOffSchoolUseCase } from '@/application/usecases/day-off-school/create/create-day-off-school.usecase';
import { DayOffSchoolType } from '@/domain/day-off-school/entity/day-off-school';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';
import { CreateDayOffSchoolRequestValidator } from './create-day-off-school-request-validator';

type RequetBodyType = {
  description: string;
  type: string;
  dateBegin: string;
  dateEnd?: string;
};

export class CreateDayOffSchoolController {
  constructor(
    private readonly createSchoolSaturdayRequestValidator: CreateDayOffSchoolRequestValidator,
    private readonly createDayOffSchoolUseCase: CreateDayOffSchoolUseCase
  ) {}

  async handle(
    request: FastifyRequest<{ Body: RequetBodyType }>,
    reply: FastifyReply
  ) {
    try {
      const validatedData =
        await this.createSchoolSaturdayRequestValidator.validate(request.body);

      const createdDayOffSchool = await this.createDayOffSchoolUseCase.execute({
        description: validatedData.description,
        type: validatedData.type as DayOffSchoolType,
        dateBegin: new Date(validatedData.dateBegin),
        dateEnd: validatedData.dateEnd
          ? new Date(validatedData.dateEnd)
          : undefined
      });

      return reply.status(201).send({ ...createdDayOffSchool });
    } catch (error) {
      const { statusCode, response } = handleControllerResponse(error as Error);
      return reply.status(statusCode).send(response);
    }
  }
}
