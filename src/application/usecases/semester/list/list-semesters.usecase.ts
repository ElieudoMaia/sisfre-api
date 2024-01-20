import { ListSemestersRepository } from '@/domain/semester/repository/list-semesters';
import {
  ListSemestersUseCaseInputDTO,
  ListSemestersUseCaseOutputDTO
} from './list-semesters.usecase.dto';

interface IListSemestersUseCase {
  execute(
    params: ListSemestersUseCaseInputDTO
  ): Promise<ListSemestersUseCaseOutputDTO>;
}

export class ListSemestersUseCase implements IListSemestersUseCase {
  constructor(
    private readonly listSemestersRepository: ListSemestersRepository
  ) {}

  async execute(
    params: ListSemestersUseCaseInputDTO
  ): Promise<ListSemestersUseCaseOutputDTO> {
    const { semesters, quantity } = await this.listSemestersRepository.findAll({
      pageNumber: params.pageNumber,
      pageSize: params.pageSize
    });

    const semesterDTO = semesters.map((semester) => ({
      id: semester.id,
      year: semester.year,
      semester: semester.semester,
      startFirstStage: semester.startFirstStage,
      endFirstStage: semester.endFirstStage,
      startSecondStage: semester.startSecondStage,
      endSecondStage: semester.endSecondStage,
      type: semester.type,
      createdAt: semester.createdAt,
      updatedAt: semester.updatedAt
    }));

    const { pageNumber, pageSize } = this.getPageAndSizeToReturn(params);

    return {
      semesters: semesterDTO,
      quantity,
      pageNumber,
      pageSize
    };
  }

  private getPageAndSizeToReturn(params: ListSemestersUseCaseInputDTO) {
    if (!params.pageNumber || !params.pageSize) {
      return { pageNumber: 1, pageSize: undefined };
    }
    return { pageNumber: params.pageNumber, pageSize: params.pageSize };
  }
}
