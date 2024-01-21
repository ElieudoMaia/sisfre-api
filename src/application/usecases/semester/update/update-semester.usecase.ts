import { InvalidResourceError } from '@/domain/@shared/error/invalid-resource.error';
import { Semester } from '@/domain/semester/entity/semester';
import { FindSemesterByIdRepository } from '@/domain/semester/repository/find-semester-by-id';
import { FindSemesterByYearRepository } from '@/domain/semester/repository/find-semester-by-year';
import { UpdateSemesterRepository } from '@/domain/semester/repository/update-semester';
import {
  UpdateSemesterUseCaseInputDTO,
  UpdateSemesterUseCaseOutputDTO
} from './update-semester.usecase.dto';

export class UpdateSemesterUseCase {
  constructor(
    private readonly findSemesterByIdRepository: FindSemesterByIdRepository,
    private readonly findSemesterByYearRepository: FindSemesterByYearRepository,
    private readonly updateSemesterRepository: UpdateSemesterRepository
  ) {}
  async execute(
    input: UpdateSemesterUseCaseInputDTO
  ): Promise<UpdateSemesterUseCaseOutputDTO> {
    const savedSemester = await this.findSemesterByIdRepository.findById(
      input.id
    );
    if (!savedSemester) {
      throw new InvalidResourceError('Semester not found');
    }

    const updatedSemester = new Semester({
      id: input.id,
      createdAt: savedSemester.createdAt,
      updatedAt: new Date(),
      year: input.year,
      semester: input.semester,
      startFirstStage: input.startFirstStage,
      endFirstStage: input.endFirstStage,
      startSecondStage: input.startSecondStage,
      endSecondStage: input.endSecondStage,
      type: input.type
    });

    const semesterForSameYear =
      await this.findSemesterByYearRepository.findByYear(input.year);

    const alreadyExists = semesterForSameYear?.some(
      (s) =>
        s.id !== updatedSemester.id &&
        s.semester === updatedSemester.semester &&
        s.type === updatedSemester.type
    );

    if (alreadyExists) {
      throw new InvalidResourceError(
        'Already exists a semester for this year with the same semester and type'
      );
    }

    await this.updateSemesterRepository.update(updatedSemester);

    return {
      id: updatedSemester.id,
      createdAt: updatedSemester.createdAt,
      updatedAt: updatedSemester.updatedAt,
      year: updatedSemester.year,
      semester: updatedSemester.semester,
      startFirstStage: updatedSemester.startFirstStage,
      endFirstStage: updatedSemester.endFirstStage,
      startSecondStage: updatedSemester.startSecondStage,
      endSecondStage: updatedSemester.endSecondStage,
      type: updatedSemester.type
    };
  }
}
