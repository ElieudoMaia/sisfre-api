import { SchoolSaturday } from '@/domain/school-saturday/entity/school-saturday';
import { CreateSchoolSaturdayRepository } from '@/domain/school-saturday/repository/create-school-saturday';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SchoolSaturdayRepository
  implements CreateSchoolSaturdayRepository
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
}
