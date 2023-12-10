import { CreateCourseUseCase } from '@/application/usecases/course/create/create-course.usecase';
import { ApplicationError } from '@/domain/@shared/error/application-error.error';
import { CourseType } from '@/domain/course/entity/course';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';
import { CreateCourseRequestValidator } from './create-course-request-validator';

type RequetBodyType = {
  name: string;
  type: CourseType;
  coordinatorId: string;
  acronym: string;
  duration: number;
};

export class CreateCourseController {
  constructor(
    private readonly createCourseRequestValidator: CreateCourseRequestValidator,
    private readonly createCourseUseCase: CreateCourseUseCase
  ) {}

  async handle(
    request: FastifyRequest<{ Body: RequetBodyType }>,
    reply: FastifyReply
  ) {
    try {
      const validatedData = await this.createCourseRequestValidator.validate(
        request.body
      );

      const createdCourse = await this.createCourseUseCase.execute({
        name: validatedData.name,
        type: validatedData.type as CourseType,
        acronym: validatedData.acronym,
        duration: validatedData.duration,
        coordinatorId: validatedData.coordinatorId
      });

      return reply.status(201).send({ ...createdCourse });
    } catch (error: unknown) {
      console.log(error);
      const { statusCode, response } = handleControllerResponse(
        error as ApplicationError
      );
      return reply.status(statusCode).send(response);
    }
  }
}
