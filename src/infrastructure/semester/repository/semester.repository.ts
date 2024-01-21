import {
  Semester,
  SemesterOfYear,
  SemesterType
} from '@/domain/semester/entity/semester';
import { CreateSemesterRepository } from '@/domain/semester/repository/create-semester';
import { DeleteSemesterRepository } from '@/domain/semester/repository/delete-semester';
import { FindSemesterByIdRepository } from '@/domain/semester/repository/find-semester-by-id';
import { FindSemesterByYearRepository } from '@/domain/semester/repository/find-semester-by-year';
import {
  ListSemestersRepository,
  ListSemestersRepositoryInput,
  ListSemestersRepositoryOutput
} from '@/domain/semester/repository/list-semesters';
import { UpdateSemesterRepository } from '@/domain/semester/repository/update-semester';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SemesterRepository
  implements
    CreateSemesterRepository,
    DeleteSemesterRepository,
    FindSemesterByIdRepository,
    FindSemesterByYearRepository,
    ListSemestersRepository,
    UpdateSemesterRepository
{
  async create(semester: Semester): Promise<void> {
    await prisma.semester.create({
      data: {
        id: semester.id,
        year: semester.year,
        semester: semester.semester,
        start_first_stage: semester.startFirstStage,
        end_first_stage: semester.endFirstStage,
        start_second_stage: semester.startSecondStage,
        end_second_stage: semester.endSecondStage,
        type: semester.type,
        created_at: semester.createdAt,
        updated_at: semester.updatedAt
      }
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.semester.delete({ where: { id } });
  }

  async findById(id: string): Promise<Semester | null> {
    const dbSemester = await prisma.semester.findUnique({ where: { id } });
    if (!dbSemester) return null;

    return new Semester({
      id: dbSemester.id,
      year: dbSemester.year,
      semester: dbSemester.semester as SemesterOfYear,
      startFirstStage: dbSemester.start_first_stage,
      endFirstStage: dbSemester.end_first_stage,
      startSecondStage: dbSemester.start_second_stage,
      endSecondStage: dbSemester.end_second_stage,
      type: dbSemester.type as SemesterType,
      createdAt: dbSemester.created_at,
      updatedAt: dbSemester.updated_at
    });
  }

  async findByYear(year: number): Promise<Semester[] | null> {
    const dbSemesters = await prisma.semester.findMany({ where: { year } });
    if (!dbSemesters.length) return null;

    return dbSemesters.map(
      (semester) =>
        new Semester({
          id: semester.id,
          year: semester.year,
          semester: semester.semester as SemesterOfYear,
          startFirstStage: semester.start_first_stage,
          endFirstStage: semester.end_first_stage,
          startSecondStage: semester.start_second_stage,
          endSecondStage: semester.end_second_stage,
          type: semester.type as SemesterType,
          createdAt: semester.created_at,
          updatedAt: semester.updated_at
        })
    );
  }

  async findAll(
    params: ListSemestersRepositoryInput
  ): Promise<ListSemestersRepositoryOutput> {
    const { pageNumber, pageSize } = params;

    let skip: number | undefined;
    let take: number | undefined;
    if (pageNumber && pageSize) {
      skip = (pageNumber - 1) * pageSize;
      take = pageSize;
    }

    const [semesters, total] = await Promise.all([
      prisma.semester.findMany({
        skip,
        take
      }),
      prisma.semester.count()
    ]);

    const semestersDTO = semesters.map(
      (semester) =>
        new Semester({
          id: semester.id,
          year: semester.year,
          semester: semester.semester as SemesterOfYear,
          startFirstStage: semester.start_first_stage,
          endFirstStage: semester.end_first_stage,
          startSecondStage: semester.start_second_stage,
          endSecondStage: semester.end_second_stage,
          type: semester.type as SemesterType,
          createdAt: semester.created_at,
          updatedAt: semester.updated_at
        })
    );

    return {
      quantity: total,
      semesters: semestersDTO
    };
  }

  async update(semester: Semester): Promise<void> {
    await prisma.semester.update({
      where: { id: semester.id },
      data: {
        year: semester.year,
        semester: semester.semester,
        start_first_stage: semester.startFirstStage,
        end_first_stage: semester.endFirstStage,
        start_second_stage: semester.startSecondStage,
        end_second_stage: semester.endSecondStage,
        type: semester.type,
        updated_at: semester.updatedAt
      }
    });
  }
}
