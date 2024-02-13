import { UpdateClassUseCase } from '@/application/usecases/class/update/update-class.usecase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';
import { UpdateClassRequestValidator } from './update-class-request-validator';

type RequetBodyType = {
  shift: string;
  coursePeriod: number;
  courseId: string;
  semesterId: string;
};

type ParamsType = {
  id: string;
};

export class UpdateClassController {
  constructor(
    private readonly updateClassRequestValidator: UpdateClassRequestValidator,
    private readonly updateClassUseCase: UpdateClassUseCase
  ) {}

  async handle(
    request: FastifyRequest<{ Body: RequetBodyType; Params: ParamsType }>,
    reply: FastifyReply
  ) {
    try {
      const validatedData = await this.updateClassRequestValidator.validate({
        ...request.body,
        id: request.params.id
      });

      const updatedClass = await this.updateClassUseCase.execute({
        id: validatedData.id,
        courseId: validatedData.courseId,
        coursePeriod: validatedData.coursePeriod,
        semesterId: validatedData.semesterId,
        shift: validatedData.shift
      });

      return reply.status(200).send({ ...updatedClass });
    } catch (error) {
      const { statusCode, response } = handleControllerResponse(error as Error);
      return reply.status(statusCode).send(response);
    }
  }
}
