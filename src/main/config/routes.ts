import setupCourseRoutes from '@/main/routes/course-routes';
import setupSchoolSaturdayRoutes from '@/main/routes/school-saturday-routes';
import setupUserRoutes from '@/main/routes/user-routes';

import { FastifyInstance } from 'fastify';

export default function setupRoutes(server: FastifyInstance): void {
  setupCourseRoutes(server);
  setupSchoolSaturdayRoutes(server);
  setupUserRoutes(server);
}
