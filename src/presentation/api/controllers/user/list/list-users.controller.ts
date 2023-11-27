import { ListUsersUseCase } from '@/application/usecases/user/list/list-users.usecase';
import { ApplicationError } from '@/domain/@shared/error/application-error.error';
import { InvalidParamError } from '@/domain/@shared/error/invalid-param-error.error';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';

type QueryType = {
  pageNumber?: string;
  pageSize?: string;
};

export class ListUsersController {
  constructor(private readonly listUsersUseCase: ListUsersUseCase) {}

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

      const response = await this.listUsersUseCase.execute(params);
      return reply.status(200).send(response);
    } catch (error: unknown) {
      const { statusCode, response } = handleControllerResponse(
        error as ApplicationError
      );
      return reply.status(statusCode).send(response);
    }
  }
}
