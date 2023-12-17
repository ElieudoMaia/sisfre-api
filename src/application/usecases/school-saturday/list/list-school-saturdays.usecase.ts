import { UseCase } from '@/domain/@shared/usecase/usecase.interface';
import { ListSchoolSaturdaysRepository } from '@/domain/school-saturday/repository/list-school-saturdays';
import {
  ListSchoolSaturdaysUseCaseInputDTO,
  ListSchoolSaturdaysUseCaseOutputDTO
} from './list-school-saturdays.usecase.dto';

export class ListSchoolSaturdaysUseCase
  implements
    UseCase<
      ListSchoolSaturdaysUseCaseInputDTO,
      ListSchoolSaturdaysUseCaseOutputDTO
    >
{
  constructor(
    private readonly listSchoolSaturdaysRepository: ListSchoolSaturdaysRepository
  ) {}

  async execute(
    params: ListSchoolSaturdaysUseCaseInputDTO
  ): Promise<ListSchoolSaturdaysUseCaseOutputDTO> {
    const { schoolSaturdays, quantity } =
      await this.listSchoolSaturdaysRepository.findAll({
        pageNumber: params.pageNumber,
        pageSize: params.pageSize
      });

    const usersDTO = schoolSaturdays.map((schoolSaturday) => ({
      id: schoolSaturday.id,
      dayOfWeek: schoolSaturday.dayOfWeek,
      date: schoolSaturday.date,
      createdAt: schoolSaturday.createdAt,
      updatedAt: schoolSaturday.updatedAt
    }));

    const { pageNumber, pageSize } = this.getPageAndSizeToReturn(params);

    return {
      schoolSaturdays: usersDTO,
      quantity,
      pageNumber,
      pageSize
    };
  }

  private getPageAndSizeToReturn(params: ListSchoolSaturdaysUseCaseInputDTO) {
    if (!params.pageNumber || !params.pageSize) {
      return { pageNumber: 1, pageSize: undefined };
    }
    return { pageNumber: params.pageNumber, pageSize: params.pageSize };
  }
}
