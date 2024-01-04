import {
  DayOfWeek,
  SchoolSaturday
} from '@/domain/school-saturday/entity/school-saturday';
import { CreateSchoolSaturdayRepository } from '@/domain/school-saturday/repository/create-school-saturday';
import { DeleteSchoolSaturdayRepository } from '@/domain/school-saturday/repository/delete-school-saturday';
import { FindSchoolSaturdayByDateRepository } from '@/domain/school-saturday/repository/find-school-saturday-by-date';
import { FindSchoolSaturdayByIdRepository } from '@/domain/school-saturday/repository/find-school-saturday-by-id';
import {
  ListSchoolSaturdaysRepository,
  ListSchoolSaturdaysRepositoryInput,
  ListSchoolSaturdaysRepositoryOutput
} from '@/domain/school-saturday/repository/list-school-saturdays';
import { UpdateSchoolSaturdayRepository } from '@/domain/school-saturday/repository/update-school-saturday';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SchoolSaturdayRepository
  implements
    CreateSchoolSaturdayRepository,
    FindSchoolSaturdayByDateRepository,
    FindSchoolSaturdayByIdRepository,
    UpdateSchoolSaturdayRepository,
    ListSchoolSaturdaysRepository,
    DeleteSchoolSaturdayRepository
{
  async create(input: SchoolSaturday): Promise<void> {
    await prisma.schoolSaturday.create({
      data: {
        id: input.id,
        day_of_week: input.dayOfWeek,
        date: input.date,
        created_at: input.createdAt,
        updated_at: input.updatedAt
      }
    });
  }

  async findAll(
    params: ListSchoolSaturdaysRepositoryInput
  ): Promise<ListSchoolSaturdaysRepositoryOutput> {
    const { pageNumber, pageSize } = params;

    let skip: number | undefined;
    let take: number | undefined;
    if (pageNumber && pageSize) {
      skip = (pageNumber - 1) * pageSize;
      take = pageSize;
    }

    const [schoolSaturdays, total] = await Promise.all([
      prisma.schoolSaturday.findMany({
        skip,
        take
      }),
      prisma.schoolSaturday.count()
    ]);

    const schoolSaturdaysDTO = schoolSaturdays.map(
      (schoolSaturday) =>
        new SchoolSaturday({
          id: schoolSaturday.id,
          dayOfWeek: schoolSaturday.day_of_week as DayOfWeek,
          date: schoolSaturday.date,
          createdAt: schoolSaturday.created_at,
          updatedAt: schoolSaturday.updated_at
        })
    );

    return {
      quantity: total,
      schoolSaturdays: schoolSaturdaysDTO
    };
  }

  async findByDate(date: Date): Promise<SchoolSaturday | null | undefined> {
    const dbSchoolSaturday = await prisma.schoolSaturday.findFirst({
      where: {
        date
      }
    });

    if (!dbSchoolSaturday) return null;

    return new SchoolSaturday({
      id: dbSchoolSaturday.id,
      dayOfWeek: dbSchoolSaturday.day_of_week as DayOfWeek,
      date: dbSchoolSaturday.date,
      createdAt: dbSchoolSaturday.created_at,
      updatedAt: dbSchoolSaturday.updated_at
    });
  }

  async findById(id: string): Promise<SchoolSaturday | null | undefined> {
    const dbSchoolSaturday = await prisma.schoolSaturday.findUnique({
      where: { id }
    });

    if (!dbSchoolSaturday) return null;

    return new SchoolSaturday({
      id: dbSchoolSaturday.id,
      dayOfWeek: dbSchoolSaturday.day_of_week as DayOfWeek,
      date: dbSchoolSaturday.date,
      createdAt: dbSchoolSaturday.created_at,
      updatedAt: dbSchoolSaturday.updated_at
    });
  }

  async update(input: SchoolSaturday): Promise<void> {
    await prisma.schoolSaturday.update({
      where: { id: input.id },
      data: {
        day_of_week: input.dayOfWeek,
        date: input.date,
        updated_at: input.updatedAt
      }
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.schoolSaturday.delete({
      where: { id }
    });
  }
}
