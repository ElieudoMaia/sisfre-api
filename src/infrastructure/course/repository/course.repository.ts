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
import {
  FindCourseByIdRepository,
  FindCourseByIdRepositoryOutput
} from '@/domain/course/repository/find-course-by-id';
import { UpdateCourseRepository } from '@/domain/course/repository/update-course';
import { User, UserRole } from '@/domain/user/entity/user';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CourseRepository
  implements
    CheckCourseExistsByNameRepository,
    CheckCourseExistsByAcronymRepository,
    CreateCourseRepository,
    FindCourseByIdRepository,
    UpdateCourseRepository
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
          id: course.id,
          name: course.name,
          acronym: course.acronym,
          type: course.type,
          duration: course.duration,
          coordinator_id: course.coordinatorId,
          created_at: course.createdAt,
          updated_at: course.updatedAt
        }
      }),
      prisma.user.update({
        where: { id: course.coordinatorId },
        data: { role: 'COORDINATOR' }
      })
    ]);
  }

  async findCourseById(id: string): Promise<FindCourseByIdRepositoryOutput> {
    const dbCourse = await prisma.course.findUnique({
      where: { id },
      include: { coordinator: true }
    });
    if (!dbCourse) return;

    const coordinator = new User({
      id: dbCourse.coordinator.id,
      name: dbCourse.coordinator.name,
      email: dbCourse.coordinator.email,
      nameAbbreviation: dbCourse.coordinator.name_abbreviation,
      role: dbCourse.coordinator.role as UserRole,
      isActive: dbCourse.coordinator.is_active,
      createdAt: dbCourse.coordinator.created_at,
      updatedAt: dbCourse.coordinator.updated_at,
      password: dbCourse.coordinator.password
    });

    const course = new Course({
      id: dbCourse.id,
      name: dbCourse.name,
      acronym: dbCourse.acronym,
      type: dbCourse.type as CourseType,
      duration: dbCourse.duration,
      coordinatorId: dbCourse.coordinator_id,
      createdAt: dbCourse.created_at,
      updatedAt: dbCourse.updated_at,
      coordinator
    });

    return course;
  }

  async updateCourse(course: Course): Promise<void> {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: course.coordinatorId },
        data: { role: 'TEACHER' }
      }),
      prisma.course.update({
        where: { id: course.id },
        data: {
          name: course.name,
          acronym: course.acronym,
          type: course.type,
          duration: course.duration,
          coordinator_id: course.coordinatorId,
          updated_at: course.updatedAt
        }
      }),
      prisma.user.update({
        where: { id: course.coordinatorId },
        data: { role: 'COORDINATOR' }
      })
    ]);
  }
}
