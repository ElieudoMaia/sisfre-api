import { ListRolesUseCase } from '@/application/usecases/role/list/list-roles.usecase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleControllerResponse } from '../../@shared/handle-controller-response';

export class ListRolesController {
  constructor(private readonly listRolesUseCase: ListRolesUseCase) {}

  async handle(_: FastifyRequest, reply: FastifyReply) {
    try {
      const roles = await this.listRolesUseCase.execute();
      return reply.status(201).send({ roles });
    } catch (error: unknown) {
      const { statusCode, response } = handleControllerResponse(error as Error);
      return reply.status(statusCode).send(response);
    }
  }
}
