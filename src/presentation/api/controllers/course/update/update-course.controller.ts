import { UpdateCourseUsecase } from '@/application/usecases/course/update/update-course.usecase';
import { ApplicationError } from '@/domain/@shared/error/application-error.error';
import { CourseType } from '@/domain/course/entity/course';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';
import { UpdateCourseRequestValidator } from './update-course-request-validator';

type RequetBodyType = {
  name: string;
  nameAbbreviation: string;
  email: string;
  role: string;
};

type RequestParamsType = {
  id: string;
};

export class UpdateCourseController {
  constructor(
    private readonly updateCourseRequestValidator: UpdateCourseRequestValidator,
    private readonly updateCourseUseCase: UpdateCourseUsecase
  ) {}

  async handle(
    request: FastifyRequest<{
      Body: RequetBodyType;
      Params: RequestParamsType;
    }>,
    reply: FastifyReply
  ) {
    try {
      const validatedData = await this.updateCourseRequestValidator.validate({
        ...request.body,
        ...request.params
      });

      // logar dadas do usuário que está fazendo a requisição
      console.log(validatedData);

      const data = {
        id: validatedData.id,
        name: validatedData.name,
        acronym: validatedData.acronym,
        coordinatorId: validatedData.coordinatorId,
        duration: validatedData.duration,
        type: validatedData.type as CourseType
      };

      await this.updateCourseUseCase.execute(data);

      return reply.status(200).send(data);
    } catch (error: unknown) {
      const { statusCode, response } = handleControllerResponse(
        error as ApplicationError
      );
      return reply.status(statusCode).send(response);
    }
  }
}
