import setupRolesRoutes from '@/main/routes/roles-routes';
import setupUserRoutes from '@/main/routes/user-routes';

import { FastifyInstance } from 'fastify';

export default function setupRoutes(server: FastifyInstance): void {
  setupUserRoutes(server);
  setupRolesRoutes(server);
}
