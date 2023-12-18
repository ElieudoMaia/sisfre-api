import {
  DayOfWeek,
  SchoolSaturday
} from '@/domain/school-saturday/entity/school-saturday';
import { CreateSchoolSaturdayRepository } from '@/domain/school-saturday/repository/create-school-saturday';
import { FindSchoolSaturdayByDateRepository } from '@/domain/school-saturday/repository/find-school-saturday-by-date';
import { FindSchoolSaturdayByIdRepository } from '@/domain/school-saturday/repository/find-school-saturday-by-id';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SchoolSaturdayRepository
  implements
    CreateSchoolSaturdayRepository,
    FindSchoolSaturdayByDateRepository,
    FindSchoolSaturdayByIdRepository
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
}
