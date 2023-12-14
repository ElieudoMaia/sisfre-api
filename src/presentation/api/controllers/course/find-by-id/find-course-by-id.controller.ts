import { FindCourseByIdUseCase } from '@/application/usecases/course/find-by-id/find-course-by-id.usecase';
import { ApplicationError } from '@/domain/@shared/error/application-error.error';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';
import { FindCourseByIdRequestValidator } from './find-course-by-id-request-validator';

type ParamsType = {
  id: string;
};

export class FindCourseByIdController {
  constructor(
    private readonly findCourseByIdRequestValidator: FindCourseByIdRequestValidator,
    private readonly findCourseByIdUseCase: FindCourseByIdUseCase
  ) {}

  async handle(
    request: FastifyRequest<{ Params: ParamsType }>,
    reply: FastifyReply
  ) {
    try {
      const id = request.params.id;
      await this.findCourseByIdRequestValidator.validate({ id });
      const course = await this.findCourseByIdUseCase.execute({ id });
      return reply.status(200).send(course);
    } catch (error: unknown) {
      const { statusCode, response } = handleControllerResponse(
        error as ApplicationError
      );
      return reply.status(statusCode).send(response);
    }
  }
}
