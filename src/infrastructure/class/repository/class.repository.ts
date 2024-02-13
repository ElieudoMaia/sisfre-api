import { Class, ClassShift } from '@/domain/class/entity/class';
import { CreateClassRepository } from '@/domain/class/repository/create-class';
import { DeleteClassRepository } from '@/domain/class/repository/delete-class';
import { FindClassByIdRepository } from '@/domain/class/repository/find-class-by-id';
import {
  ListClassesRepository,
  ListClassesRepositoryInput,
  ListClassesRepositoryOutput
} from '@/domain/class/repository/list-classes';
import { UpdateClassRepository } from '@/domain/class/repository/update-class';
import { Course, CourseType } from '@/domain/course/entity/course';
import {
  Semester,
  SemesterOfYear,
  SemesterType
} from '@/domain/semester/entity/semester';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ClassRepository
  implements
    CreateClassRepository,
    ListClassesRepository,
    FindClassByIdRepository,
    UpdateClassRepository,
    DeleteClassRepository
{
  async create(schoolClass: Class): Promise<void> {
    await prisma.class.create({
      data: {
        id: schoolClass.id,
        course_id: schoolClass.course.id,
        semester_id: schoolClass.semester.id,
        course_period: schoolClass.coursePeriod,
        shift: schoolClass.shift,
        created_at: schoolClass.createdAt,
        updated_at: schoolClass.updatedAt
      }
    });
  }

  async findAll(
    params: ListClassesRepositoryInput
  ): Promise<ListClassesRepositoryOutput> {
    const { pageNumber, pageSize } = params;

    let skip: number | undefined;
    let take: number | undefined;
    if (pageNumber && pageSize) {
      skip = (pageNumber - 1) * pageSize;
      take = pageSize;
    }

    const [classes, total] = await Promise.all([
      prisma.class.findMany({
        skip,
        take,
        include: { course: true, semester: true }
      }),
      prisma.class.count()
    ]);

    const classesDTO = classes.map(
      (cls) =>
        new Class({
          id: cls.id,
          course: new Course({
            id: cls.course.id,
            name: cls.course.name,
            duration: cls.course.duration,
            type: cls.course.type as CourseType,
            acronym: cls.course.acronym,
            coordinatorId: cls.course.coordinator_id,
            createdAt: cls.course.created_at,
            updatedAt: cls.course.updated_at
          }),
          semester: new Semester({
            id: cls.semester.id,
            semester: cls.semester.semester as SemesterOfYear,
            type: cls.semester.type as SemesterType,
            year: cls.semester.year,
            startFirstStage: cls.semester.start_first_stage,
            endFirstStage: cls.semester.end_first_stage,
            startSecondStage: cls.semester.start_second_stage,
            endSecondStage: cls.semester.end_second_stage,
            createdAt: cls.semester.created_at,
            updatedAt: cls.semester.updated_at
          }),
          coursePeriod: cls.course_period,
          shift: cls.shift as ClassShift,
          createdAt: cls.created_at,
          updatedAt: cls.updated_at
        })
    );

    return {
      quantity: total,
      classes: classesDTO
    };
  }

  async findById(id: string): Promise<Class | null> {
    const dbClass = await prisma.class.findUnique({
      where: { id },
      include: {
        course: true,
        semester: true
      }
    });

    if (!dbClass) return null;

    const course = new Course({
      id: dbClass.course.id,
      name: dbClass.course.name,
      duration: dbClass.course.duration,
      type: dbClass.course.type as CourseType,
      acronym: dbClass.course.acronym,
      coordinatorId: dbClass.course.coordinator_id,
      createdAt: dbClass.course.created_at,
      updatedAt: dbClass.course.updated_at
    });

    const semester = new Semester({
      id: dbClass.semester.id,
      semester: dbClass.semester.semester as SemesterOfYear,
      type: dbClass.semester.type as SemesterType,
      year: dbClass.semester.year,
      startFirstStage: dbClass.semester.start_first_stage,
      endFirstStage: dbClass.semester.end_first_stage,
      startSecondStage: dbClass.semester.start_second_stage,
      endSecondStage: dbClass.semester.end_second_stage,
      createdAt: dbClass.semester.created_at,
      updatedAt: dbClass.semester.updated_at
    });

    return new Class({
      id: dbClass.id,
      course,
      semester,
      coursePeriod: dbClass.course_period,
      shift: dbClass.shift as ClassShift,
      createdAt: dbClass.created_at,
      updatedAt: dbClass.updated_at
    });
  }

  async update(schoolClass: Class): Promise<void> {
    await prisma.class.update({
      where: { id: schoolClass.id },
      data: {
        course_id: schoolClass.course.id,
        semester_id: schoolClass.semester.id,
        course_period: schoolClass.coursePeriod,
        shift: schoolClass.shift,
        updated_at: schoolClass.updatedAt
      }
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.class.delete({
      where: { id }
    });
  }
}
