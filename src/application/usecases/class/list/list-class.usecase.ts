import { UseCase } from '@/domain/@shared/usecase/usecase.interface';
import { ListClassesRepository } from '@/domain/class/repository/list-classes';
import {
  ListClassesUseCaseInputDTO,
  ListClassesUseCaseOutputDTO
} from './list-class.usecase.dto';

interface IListClassesUseCase
  extends UseCase<ListClassesUseCaseInputDTO, ListClassesUseCaseOutputDTO> {}

export class ListClassesUseCase implements IListClassesUseCase {
  constructor(private readonly listClassesRepository: ListClassesRepository) {}

  async execute(
    params: ListClassesUseCaseInputDTO
  ): Promise<ListClassesUseCaseOutputDTO> {
    const { classes, quantity } = await this.listClassesRepository.findAll({
      pageNumber: params.pageNumber,
      pageSize: params.pageSize
    });

    const classesDTO = classes.map((cl) => ({
      id: cl.id,
      shift: cl.shift,
      coursePeriod: cl.coursePeriod,
      course: {
        id: cl.course.id,
        name: cl.course.name,
        duration: cl.course.duration
      },
      semester: {
        id: cl.semester.id,
        year: cl.semester.year,
        semester: cl.semester.semester
      },
      createdAt: cl.createdAt,
      updatedAt: cl.updatedAt
    }));

    const { pageNumber, pageSize } = this.getPageAndSizeToReturn(params);

    return {
      classes: classesDTO,
      quantity,
      pageNumber,
      pageSize
    };
  }

  private getPageAndSizeToReturn(params: ListClassesUseCaseInputDTO) {
    if (!params.pageNumber || !params.pageSize) {
      return { pageNumber: 1, pageSize: undefined };
    }
    return { pageNumber: params.pageNumber, pageSize: params.pageSize };
  }
}
