import setupCourseRoutes from '@/main/routes/course-routes';
import setupUserRoutes from '@/main/routes/user-routes';

import { FastifyInstance } from 'fastify';

export default function setupRoutes(server: FastifyInstance): void {
  setupUserRoutes(server);
  setupCourseRoutes(server);
}
