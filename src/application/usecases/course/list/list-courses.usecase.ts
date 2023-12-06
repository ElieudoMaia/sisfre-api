import { ListCoursesRepository } from '@/domain/course/repository/list-courses';
import {
  listCoursesUseCaseInputDTO,
  listCoursesUseCaseOutputDTO
} from './list-courses.usecase.dto';

export class ListCoursesUseCase {
  constructor(private readonly listCoursesRepository: ListCoursesRepository) {}

  async execute(
    params: listCoursesUseCaseInputDTO
  ): Promise<listCoursesUseCaseOutputDTO> {
    const { courses, quantity } = await this.listCoursesRepository.findAll({
      pageNumber: params.pageNumber,
      pageSize: params.pageSize
    });

    const coursesDTO = courses.map((course) => {
      const coordinator = course.coordinator
        ? {
            id: course.coordinator.id,
            name: course.coordinator.name,
            email: course.coordinator.email
          }
        : undefined;

      return {
        id: course.id,
        name: course.name,
        type: course.type,
        acronym: course.acronym,
        duration: course.duration,
        coordinator
      };
    });

    const { pageNumber, pageSize } = this.getPageAndSizeToReturn(params);

    return {
      courses: coursesDTO,
      quantity,
      pageNumber,
      pageSize
    };
  }

  getPageAndSizeToReturn(params: listCoursesUseCaseInputDTO) {
    if (!params.pageNumber || !params.pageSize) {
      return { pageNumber: 1, pageSize: undefined };
    }
    return { pageNumber: params.pageNumber, pageSize: params.pageSize };
  }
}
