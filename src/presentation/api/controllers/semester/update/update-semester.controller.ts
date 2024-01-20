import { UpdateSemesterUseCase } from '@/application/usecases/semester/update/update-semester.usecase';
import { SemesterOfYear } from '@/domain/semester/entity/semester';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';
import { UpdateSemesterRequestValidator } from './update-semester-request-validator';

type RequetBodyType = {
  year: number;
  semester: number;
  startFirstStage: Date;
  endFirstStage: Date;
  startSecondStage: Date;
  endSecondStage: Date;
  type: string;
};

type ParamsType = {
  id: string;
};

export class UpdateSemesterController {
  constructor(
    private readonly updateSemesterRequestValidator: UpdateSemesterRequestValidator,
    private readonly updateSemesterUseCase: UpdateSemesterUseCase
  ) {}

  async handle(
    request: FastifyRequest<{ Body: RequetBodyType; Params: ParamsType }>,
    reply: FastifyReply
  ) {
    try {
      const validatedData = await this.updateSemesterRequestValidator.validate({
        ...request.body,
        id: request.params.id
      });

      const updatedSemester = await this.updateSemesterUseCase.execute({
        id: validatedData.id,
        year: validatedData.year,
        semester: validatedData.semester as SemesterOfYear,
        startFirstStage: validatedData.startFirstStage,
        endFirstStage: validatedData.endFirstStage,
        startSecondStage: validatedData.startSecondStage,
        endSecondStage: validatedData.endSecondStage,
        type: validatedData.type
      });

      return reply.status(200).send({ ...updatedSemester });
    } catch (error) {
      const { statusCode, response } = handleControllerResponse(error as Error);
      return reply.status(statusCode).send(response);
    }
  }
}
