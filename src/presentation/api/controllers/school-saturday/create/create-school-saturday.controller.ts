import { CreateSchoolSaturdayUseCase } from '@/application/usecases/school-saturday/create/create-school-saturday.usecase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';
import { CreateSchoolSaturdayRequestValidator } from './create-school-saturday-request-validator';

type RequetBodyType = {
  name: string;
  nameAbbreviation: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: string;
};

export class CreateSchoolSaturdayController {
  constructor(
    private readonly createSchoolSaturdayRequestValidator: CreateSchoolSaturdayRequestValidator,
    private readonly createSchoolSaturdayUseCase: CreateSchoolSaturdayUseCase
  ) {}

  async handle(
    request: FastifyRequest<{ Body: RequetBodyType }>,
    reply: FastifyReply
  ) {
    try {
      const validatedData =
        await this.createSchoolSaturdayRequestValidator.validate(request.body);

      const createdSchoolSaturday =
        await this.createSchoolSaturdayUseCase.execute({
          date: new Date(validatedData.date),
          dayOfWeek: validatedData.dayOfWeek
        });

      return reply.status(201).send({ ...createdSchoolSaturday });
    } catch (error) {
      const { statusCode, response } = handleControllerResponse(error as Error);
      return reply.status(statusCode).send(response);
    }
  }
}
