import { DayOffSchool } from '@/domain/day-off-school/entity/day-off-school';
import { CreateDayOffSchoolRepository } from '@/domain/day-off-school/repository/create-day-off-school';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DayOffSchoolRepository implements CreateDayOffSchoolRepository {
  async create(dayOffSchool: DayOffSchool): Promise<void> {
    await prisma.dayOffSchool.create({
      data: {
        id: dayOffSchool.id,
        description: dayOffSchool.description,
        type: dayOffSchool.type,
        dateBegin: dayOffSchool.dateBegin,
        dateEnd: dayOffSchool.dateEnd,
        created_at: dayOffSchool.createdAt,
        updated_at: dayOffSchool.updatedAt
      }
    });
  }
}
