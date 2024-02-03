import {
  DayOffSchool,
  DayOffSchoolType
} from '@/domain/day-off-school/entity/day-off-school';
import { CheckHasRecessOrVocationInDateRangeRepository } from '@/domain/day-off-school/repository/check-has-recess-or-vocation-In-date-range';
import { CreateDayOffSchoolRepository } from '@/domain/day-off-school/repository/create-day-off-school';
import { DeleteDayOffSchoolRepository } from '@/domain/day-off-school/repository/delete-day-off-school';
import { FindDayOffSchoolByIdRepository } from '@/domain/day-off-school/repository/find-day-off-school-by-id';
import { FindRecessOrVocationInDateRangeRepository } from '@/domain/day-off-school/repository/find-recess-or-vocation-in-date-range';
import {
  ListDaysOffSchoolRepository,
  ListDaysOffSchoolRepositoryInput,
  ListDaysOffSchoolRepositoryOutput
} from '@/domain/day-off-school/repository/list-days-off-school';
import { UpdateDayOffSchoolRepository } from '@/domain/day-off-school/repository/update-day-off-school';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DayOffSchoolRepository
  implements
    CreateDayOffSchoolRepository,
    UpdateDayOffSchoolRepository,
    ListDaysOffSchoolRepository,
    FindDayOffSchoolByIdRepository,
    DeleteDayOffSchoolRepository,
    CheckHasRecessOrVocationInDateRangeRepository,
    FindRecessOrVocationInDateRangeRepository
{
  async create(dayOffSchool: DayOffSchool): Promise<void> {
    await prisma.dayOffSchool.create({
      data: {
        id: dayOffSchool.id,
        description: dayOffSchool.description,
        type: dayOffSchool.type,
        date_begin: dayOffSchool.dateBegin,
        date_end: dayOffSchool.dateEnd,
        created_at: dayOffSchool.createdAt,
        updated_at: dayOffSchool.updatedAt
      }
    });
  }

  async update(dayOffSchool: DayOffSchool): Promise<void> {
    await prisma.dayOffSchool.update({
      where: { id: dayOffSchool.id },
      data: {
        description: dayOffSchool.description,
        type: dayOffSchool.type,
        date_begin: dayOffSchool.dateBegin,
        date_end: dayOffSchool.dateEnd,
        updated_at: dayOffSchool.updatedAt
      }
    });
  }

  async findAll(
    params: ListDaysOffSchoolRepositoryInput
  ): Promise<ListDaysOffSchoolRepositoryOutput> {
    const { pageNumber, pageSize } = params;

    let skip: number | undefined;
    let take: number | undefined;
    if (pageNumber && pageSize) {
      skip = (pageNumber - 1) * pageSize;
      take = pageSize;
    }

    const [daysOffSchool, total] = await Promise.all([
      prisma.dayOffSchool.findMany({
        skip,
        take
      }),
      prisma.dayOffSchool.count()
    ]);

    const daysOffSchoolDTO = daysOffSchool.map(
      (dayOffSchool) =>
        new DayOffSchool({
          id: dayOffSchool.id,
          description: dayOffSchool.description,
          type: dayOffSchool.type as DayOffSchoolType,
          dateBegin: dayOffSchool.date_begin,
          dateEnd: dayOffSchool.date_end ?? undefined,
          createdAt: dayOffSchool.created_at,
          updatedAt: dayOffSchool.updated_at
        })
    );

    return {
      quantity: total,
      daysOffSchool: daysOffSchoolDTO
    };
  }

  async findById(id: string): Promise<DayOffSchool | null> {
    const dayOffSchooldb = await prisma.dayOffSchool.findUnique({
      where: { id }
    });

    if (!dayOffSchooldb) return null;

    return new DayOffSchool({
      id: dayOffSchooldb.id,
      description: dayOffSchooldb.description,
      type: dayOffSchooldb.type as DayOffSchoolType,
      dateBegin: dayOffSchooldb.date_begin,
      dateEnd: dayOffSchooldb.date_end ?? undefined,
      createdAt: dayOffSchooldb.created_at,
      updatedAt: dayOffSchooldb.updated_at
    });
  }

  async delete(dayOffSchoolId: string): Promise<void> {
    await prisma.dayOffSchool.delete({
      where: { id: dayOffSchoolId }
    });
  }

  async checkByDateRange(dateBegin: Date, dateEnd: Date): Promise<boolean> {
    const dayOffSchool = await prisma.dayOffSchool.findFirst({
      where: {
        type: { in: ['VOCATION', 'RECESS'] },
        OR: [
          {
            date_begin: { lte: dateBegin },
            date_end: { gte: dateBegin }
          },
          {
            date_begin: { lte: dateEnd },
            date_end: { gte: dateEnd }
          }
        ]
      }
    });

    return !!dayOffSchool;
  }

  async findInRange(
    dateBegin: Date,
    dateEnd: Date
  ): Promise<DayOffSchool[] | null> {
    const daysOffSchool = await prisma.dayOffSchool.findMany({
      where: {
        OR: [
          {
            date_begin: { lte: dateBegin },
            date_end: { gte: dateBegin }
          },
          {
            date_begin: { lte: dateEnd },
            date_end: { gte: dateEnd }
          }
        ]
      }
    });

    if (!daysOffSchool) return null;

    return daysOffSchool.map(
      (dayOffSchool) =>
        new DayOffSchool({
          id: dayOffSchool.id,
          description: dayOffSchool.description,
          type: dayOffSchool.type as DayOffSchoolType,
          dateBegin: dayOffSchool.date_begin,
          dateEnd: dayOffSchool.date_end ?? undefined,
          createdAt: dayOffSchool.created_at,
          updatedAt: dayOffSchool.updated_at
        })
    );
  }
}
