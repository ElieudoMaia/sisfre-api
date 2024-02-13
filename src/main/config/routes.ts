import setupClassRoutes from '@/main/routes/class-routes';
import setupCourseRoutes from '@/main/routes/course-routes';
import setupDayOffSchoolRoutes from '@/main/routes/day-off-school';
import setupSchoolSaturdayRoutes from '@/main/routes/school-saturday-routes';
import setupSemesterRoutes from '@/main/routes/semester-routes';
import setupUserRoutes from '@/main/routes/user-routes';

import { FastifyInstance } from 'fastify';

export default function setupRoutes(server: FastifyInstance): void {
  setupClassRoutes(server);
  setupCourseRoutes(server);
  setupDayOffSchoolRoutes(server);
  setupSchoolSaturdayRoutes(server);
  setupSemesterRoutes(server);
  setupUserRoutes(server);
}
