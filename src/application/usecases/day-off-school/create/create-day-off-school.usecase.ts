import { InvalidParamError } from '@/domain/@shared/error/invalid-param-error.error';
import {
  DayOffSchool,
  DayOffSchoolType
} from '@/domain/day-off-school/entity/day-off-school';
import { CheckHasRecessOrVocationInDateRangeRepository } from '@/domain/day-off-school/repository/check-has-recess-or-vocation-In-date-range';
import { CreateDayOffSchoolRepository } from '@/domain/day-off-school/repository/create-day-off-school';
import {
  CreateDayOffSchoolUseCaseInputDTO,
  CreateDayOffSchoolUseCaseOutputDTO
} from './create-day-off-school.usecase.dto';

export class CreateDayOffSchoolUseCase {
  constructor(
    private readonly checkHasRecessOrVocationInDateRangeRepository: CheckHasRecessOrVocationInDateRangeRepository,
    private readonly createDayOffSchoolRepository: CreateDayOffSchoolRepository
  ) {}

  async execute(
    input: CreateDayOffSchoolUseCaseInputDTO
  ): Promise<CreateDayOffSchoolUseCaseOutputDTO> {
    const dayOffSchool = new DayOffSchool(input);

    if (
      dayOffSchool.type === DayOffSchoolType.RECESS ||
      dayOffSchool.type === DayOffSchoolType.VOCATION
    ) {
      const isBusyDate =
        await this.checkHasRecessOrVocationInDateRangeRepository.checkByDateRange(
          dayOffSchool.dateBegin,
          dayOffSchool.dateEnd!
        );

      if (isBusyDate) {
        throw new InvalidParamError(
          'Already exists a recess or vocation in this date range'
        );
      }
    }

    await this.createDayOffSchoolRepository.create(dayOffSchool);

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
