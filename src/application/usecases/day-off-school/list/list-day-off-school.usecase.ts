import { UseCase } from '@/domain/@shared/usecase/usecase.interface';
import { ListDaysOffSchoolRepository } from '@/domain/day-off-school/repository/list-days-off-school';
import {
  ListDaysOffSchoolUseCaseInputDTO,
  ListDaysOffSchoolUseCaseOutputDTO
} from './list-day-off-school.usecase.dto';

interface IListDayOffSchoolUseCase
  extends UseCase<
    ListDaysOffSchoolUseCaseInputDTO,
    ListDaysOffSchoolUseCaseOutputDTO
  > {}

export class ListDaysOffSchoolUseCase implements IListDayOffSchoolUseCase {
  constructor(
    private readonly listDaysOffSchoolRepository: ListDaysOffSchoolRepository
  ) {}

  async execute(
    params: ListDaysOffSchoolUseCaseInputDTO
  ): Promise<ListDaysOffSchoolUseCaseOutputDTO> {
    const { daysOffSchool, quantity } =
      await this.listDaysOffSchoolRepository.findAll({
        pageNumber: params.pageNumber,
        pageSize: params.pageSize,
        description: params.description
      });

    const daysOff = daysOffSchool.map((dayOffSchool) => ({
      id: dayOffSchool.id,
      description: dayOffSchool.description,
      type: dayOffSchool.type,
      dateBegin: dayOffSchool.dateBegin,
      dateEnd: dayOffSchool.dateEnd,
      createdAt: dayOffSchool.createdAt,
      updatedAt: dayOffSchool.updatedAt
    }));

    const { pageNumber, pageSize } = this.getPageAndSizeToReturn(params);

    return {
      daysOffSchool: daysOff,
      quantity,
      pageNumber,
      pageSize
    };
  }

  private getPageAndSizeToReturn(params: ListDaysOffSchoolUseCaseInputDTO) {
    if (!params.pageNumber || !params.pageSize) {
      return { pageNumber: 1, pageSize: undefined };
    }
    return { pageNumber: params.pageNumber, pageSize: params.pageSize };
  }
}
