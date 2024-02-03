import { ListDaysOffSchoolUseCase } from '@/application/usecases/day-off-school/list/list-day-off-school.usecase';
import { InvalidParamError } from '@/domain/@shared/error/invalid-param-error.error';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';

type QueryType = {
  pageNumber?: string;
  pageSize?: string;
};

export class ListDaysOffSchoolController {
  constructor(
    private readonly listDaysOffSchoolUseCase: ListDaysOffSchoolUseCase
  ) {}

  async handle(
    request: FastifyRequest<{ Querystring: QueryType }>,
    reply: FastifyReply
  ) {
    try {
      const { pageNumber, pageSize } = request.query;
      const params = {
        pageNumber: pageNumber ? parseInt(pageNumber, 10) : undefined,
        pageSize: pageSize ? parseInt(pageSize, 10) : undefined
      };

      if (Number.isNaN(params.pageNumber) || Number.isNaN(params.pageSize)) {
        throw new InvalidParamError('pageNumber and pageSize must be numbers');
      }

      const response = await this.listDaysOffSchoolUseCase.execute(params);
      return reply.status(200).send(response);
    } catch (error: unknown) {
      const { statusCode, response } = handleControllerResponse(error as Error);
      return reply.status(statusCode).send(response);
    }
  }
}
