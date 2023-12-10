import { Course, CourseType } from '@/domain/course/entity/course';
import {
  CheckCourseExistsByAcronymRepository,
  CheckCourseExistsByAcronymRepositoryOutput
} from '@/domain/course/repository/check-course-exists-by-acronym';
import {
  CheckCourseExistsByNameRepository,
  CheckCourseExistsByNameRepositoryOutput
} from '@/domain/course/repository/check-course-exists-by-name';
import { CreateCourseRepository } from '@/domain/course/repository/create-course';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CourseRepository
  implements
    CheckCourseExistsByNameRepository,
    CheckCourseExistsByAcronymRepository,
    CreateCourseRepository
{
  async checkCourseExistsByName(
    name: string
  ): Promise<CheckCourseExistsByNameRepositoryOutput> {
    const course = await prisma.course.findUnique({ where: { name } });
    if (!course) return;

    return {
      id: course.id,
      name: course.name,
      type: course.type as CourseType
    };
  }

  async checkCourseExistsByAcronym(
    acronym: string
  ): Promise<CheckCourseExistsByAcronymRepositoryOutput> {
    const course = await prisma.course.findUnique({ where: { acronym } });
    if (!course) return;

    return {
      id: course.id,
      name: course.name,
      type: course.type as CourseType
    };
  }

  async createCourse(course: Course): Promise<void> {
    await prisma.$transaction([
      prisma.course.create({
        data: {
          name: course.name,
          acronym: course.acronym,
          type: course.type,
          duration: course.duration,
          coordinator_id: course.coordinatorId
        }
      }),
      prisma.user.update({
        where: { id: course.coordinatorId },
        data: { role: 'COORDINATOR' }
      })
    ]);
  }
}
