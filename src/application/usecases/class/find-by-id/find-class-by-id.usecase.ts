import { NotFoundError } from '@/domain/@shared/error/not-found.error';
import { UseCase } from '@/domain/@shared/usecase/usecase.interface';
import { FindClassByIdRepository } from '@/domain/class/repository/find-class-by-id';
import {
  FindClassByIdInputDTO,
  FindClassByIdOutputDTO
} from './find-class-by-id.usecase.dto';

interface IFindClassByIdUseCase
  extends UseCase<FindClassByIdInputDTO, FindClassByIdOutputDTO> {}

export class FindClassByIdUseCase implements IFindClassByIdUseCase {
  constructor(
    private readonly findClassByIdRepository: FindClassByIdRepository
  ) {}

  async execute({
    id
  }: FindClassByIdInputDTO): Promise<FindClassByIdOutputDTO> {
    const schoolClass = await this.findClassByIdRepository.findById(id);

    if (!schoolClass) {
      throw new NotFoundError('class not found');
    }

    return {
      id: schoolClass.id,
      shift: schoolClass.shift,
      coursePeriod: schoolClass.coursePeriod,
      course: {
        id: schoolClass.course.id,
        name: schoolClass.course.name,
        duration: schoolClass.course.duration
      },
      semester: {
        id: schoolClass.semester.id,
        year: schoolClass.semester.year,
        semester: schoolClass.semester.semester
      },
      createdAt: schoolClass.createdAt,
      updatedAt: schoolClass.updatedAt
    };
  }
}
