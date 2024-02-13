import { CreateClassUseCase } from '@/application/usecases/class/create/create-class.usecase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';
import { CreateClassRequestValidator } from './create-class-request-validator';

type RequetBodyType = {
  shift: string;
  coursePeriod: number;
  courseId: string;
  semesterId: string;
};

export class CreateClassController {
  constructor(
    private readonly createClassRequestValidator: CreateClassRequestValidator,
    private readonly createClassUseCase: CreateClassUseCase
  ) {}

  async handle(
    request: FastifyRequest<{ Body: RequetBodyType }>,
    reply: FastifyReply
  ) {
    try {
      const validatedData = await this.createClassRequestValidator.validate(
        request.body
      );

      const createdClass = await this.createClassUseCase.execute({
        shift: validatedData.shift,
        coursePeriod: validatedData.coursePeriod,
        courseId: validatedData.courseId,
        semesterId: validatedData.semesterId
      });

      return reply.status(201).send({ ...createdClass });
    } catch (error) {
      const { statusCode, response } = handleControllerResponse(error as Error);
      return reply.status(statusCode).send(response);
    }
  }
}
