import { NotFoundError } from '@/domain/@shared/error/not-found.error';
import { FindSemesterByIdRepository } from '@/domain/semester/repository/find-semester-by-id';
import {
  FindSemesterByIdInputDTO,
  FindSemesterByIdOutputDTO
} from './find-semester-by-id.usecase.dto';

interface IFindSemesterByIdUseCase {
  execute(data: FindSemesterByIdInputDTO): Promise<FindSemesterByIdOutputDTO>;
}

export class FindSemesterByIdUseCase implements IFindSemesterByIdUseCase {
  constructor(
    private readonly findSemesterByIdRepository: FindSemesterByIdRepository
  ) {}

  async execute({
    id
  }: FindSemesterByIdInputDTO): Promise<FindSemesterByIdOutputDTO> {
    const semester = await this.findSemesterByIdRepository.findById(id);

    if (!semester) {
      throw new NotFoundError('semester not found');
    }

    return {
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
    };
  }
}
