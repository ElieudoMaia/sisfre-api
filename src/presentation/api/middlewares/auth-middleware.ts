/* eslint-disable @typescript-eslint/no-explicit-any */
import { TokenDecrypter } from '@/domain/user/gateway/token-decrypter';
import { FindUserByIdRepository } from '@/domain/user/repository/find-user-by-id';
import { FastifyReply, FastifyRequest } from 'fastify';

export class AuthMiddleware {
  constructor(
    private readonly tokenDecrypter: TokenDecrypter,
    private findUserByIdRepository: FindUserByIdRepository
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      if (this.isAOpenRoute(request.url)) return;

      const { Authorization, authorization } = request.headers;
      const auth = (Authorization ?? authorization) as string;

      const token = auth?.split(' ')[1];

      if (!token) {
        return reply
          .status(401)
          .send({ message: 'Unauthorized: missing token' });
      }

      let payload = null;
      try {
        payload = this.tokenDecrypter.decrypt(token);
      } catch (error) {
        return reply
          .status(401)
          .send({ message: 'Unauthorized: invalid token' });
      }

      if (!payload) {
        return reply
          .status(401)
          .send({ message: 'Unauthorized: invalid token' });
      }

      const user = await this.findUserByIdRepository.findUserById(payload.id);
      if (!user || user.isActive === false) {
        return reply
          .status(401)
          .send({ message: 'Unauthorized: user not allowed' });
      }

      return;
    } catch (error) {
      return reply.status(500).send({ message: 'Internal server error' });
    }
  }

  private readonly isAOpenRoute = (url: string): boolean => {
    if (url === '/health') return true;
    if (url === '/login') return true;

    const isDocs = url.includes('/docs');
    const isStatic = /\/docs\/static\/+/;
    return isDocs || isStatic.test(url);
  };
}
