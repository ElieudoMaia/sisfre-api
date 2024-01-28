import { InvalidResourceError } from '@/domain/@shared/error/invalid-resource.error';

import {
  DayOffSchool,
  DayOffSchoolType
} from '@/domain/day-off-school/entity/day-off-school';
import { FindDayOffSchoolByIdRepository } from '@/domain/day-off-school/repository/find-day-off-school-by-id-repository';
import { FindRecessOrVocationInDateRangeRepository } from '@/domain/day-off-school/repository/find-recess-or-vocation-in-date-range';
import { UpdateDayOffSchoolRepository } from '@/domain/day-off-school/repository/update-day-off-school';
import {
  UpdateDayOffSchoolUseCaseInputDTO,
  UpdateDayOffSchoolUseCaseOutputDTO
} from './update-day-off-school.usecase.dto';

export class UpdateDayOffSchoolUseCase {
  constructor(
    private readonly findDayOffSchoolByIdRepository: FindDayOffSchoolByIdRepository,
    private readonly findRecessOrVocationInDateRangeRepository: FindRecessOrVocationInDateRangeRepository,
    private readonly updateDayOffSchoolRepository: UpdateDayOffSchoolRepository
  ) {}
  async execute(
    input: UpdateDayOffSchoolUseCaseInputDTO
  ): Promise<UpdateDayOffSchoolUseCaseOutputDTO> {
    const savedDayOffSchool =
      await this.findDayOffSchoolByIdRepository.findById(input.id);
    if (!savedDayOffSchool) {
      throw new InvalidResourceError('day off school not found');
    }

    const dayOffSchool = new DayOffSchool({
      id: input.id,
      description: input.description,
      type: input.type,
      dateBegin: input.dateBegin,
      dateEnd: input.dateEnd,
      createdAt: savedDayOffSchool.createdAt,
      updatedAt: new Date()
    });

    if (
      dayOffSchool.type === DayOffSchoolType.RECESS ||
      dayOffSchool.type === DayOffSchoolType.VOCATION
    ) {
      const existingDaysOff =
        await this.findRecessOrVocationInDateRangeRepository.findInRange(
          dayOffSchool.dateBegin,
          dayOffSchool.dateEnd!
        );

      if (existingDaysOff && existingDaysOff.length > 0) {
        const isOther = existingDaysOff.some(
          (dayOff) => dayOff.id !== dayOffSchool.id
        );

        if (isOther) {
          throw new InvalidResourceError(
            'Already exists a recess or vocation in this date range'
          );
        }
      }
    }

    await this.updateDayOffSchoolRepository.update(dayOffSchool);

    return {
      id: dayOffSchool.id,
      description: dayOffSchool.description,
      type: dayOffSchool.type,
      dateBegin: dayOffSchool.dateBegin,
      dateEnd: dayOffSchool.dateEnd,
      createdAt: dayOffSchool.createdAt,
      updatedAt: dayOffSchool.updatedAt
    };
  }
}
