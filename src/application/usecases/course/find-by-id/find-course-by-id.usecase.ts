import { InvalidResourceError } from '@/domain/@shared/error/invalid-resource.error';
import { UseCase } from '@/domain/@shared/usecase/usecase.interface';
import { FindCourseByIdRepository } from '@/domain/course/repository/find-course-by-id';
import {
  FindCourseByIdInputDTO,
  FindCourseByIdOutputDTO
} from './find-course-by-id.usecase.dto';

export class FindCourseByIdUseCase
  implements UseCase<FindCourseByIdInputDTO, FindCourseByIdOutputDTO>
{
  constructor(
    private readonly findCourseByIdRepository: FindCourseByIdRepository
  ) {}

  async execute({
    id
  }: FindCourseByIdInputDTO): Promise<FindCourseByIdOutputDTO> {
    const course = await this.findCourseByIdRepository.findCourseById(id);
    if (!course) throw new InvalidResourceError('Course not found');

    return {
      id: course.id,
      name: course.name,
      type: course.type,
      acronym: course.acronym,
      duration: course.duration,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
      coordinator: {
        id: course.coordinator!.id,
        name: course.coordinator!.name
      }
    };
  }
}
