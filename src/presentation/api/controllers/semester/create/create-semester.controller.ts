import { CreateSemesterUseCase } from '@/application/usecases/semester/create/create-semester.usecase';
import { SemesterOfYear } from '@/domain/semester/entity/semester';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';
import { CreateSemesterRequestValidator } from './create-semester-request-validator';

type RequetBodyType = {
  year: number;
  semester: number;
  startFirstStage: Date;
  endFirstStage: Date;
  startSecondStage: Date;
  endSecondStage: Date;
  type: string;
};

export class CreateSemesterController {
  constructor(
    private readonly createSemesterRequestValidator: CreateSemesterRequestValidator,
    private readonly createSemesterUseCase: CreateSemesterUseCase
  ) {}

  async handle(
    request: FastifyRequest<{ Body: RequetBodyType }>,
    reply: FastifyReply
  ) {
    try {
      const validatedData = await this.createSemesterRequestValidator.validate(
        request.body
      );

      const createdSemester = await this.createSemesterUseCase.execute({
        year: validatedData.year,
        semester: validatedData.semester as SemesterOfYear,
        startFirstStage: validatedData.startFirstStage,
        endFirstStage: validatedData.endFirstStage,
        startSecondStage: validatedData.startSecondStage,
        endSecondStage: validatedData.endSecondStage,
        type: validatedData.type
      });

      return reply.status(201).send({ ...createdSemester });
    } catch (error) {
      const { statusCode, response } = handleControllerResponse(error as Error);
      return reply.status(statusCode).send(response);
    }
  }
}
