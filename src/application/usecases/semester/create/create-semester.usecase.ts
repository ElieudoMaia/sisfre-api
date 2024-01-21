import { InvalidResourceError } from '@/domain/@shared/error/invalid-resource.error';
import { Semester } from '@/domain/semester/entity/semester';
import { CreateSemesterRepository } from '@/domain/semester/repository/create-semester';
import { FindSemesterByYearRepository } from '@/domain/semester/repository/find-semester-by-year';
import {
  CreateSemesterUseCaseInputDTO,
  CreateSemesterUseCaseOutputDTO
} from './create-semester.usecase.dto';

interface ICreateSemesterUseCase {
  execute(
    input: CreateSemesterUseCaseInputDTO
  ): Promise<CreateSemesterUseCaseOutputDTO>;
}

export class CreateSemesterUseCase implements ICreateSemesterUseCase {
  constructor(
    private readonly findSemesterByYearRepository: FindSemesterByYearRepository,
    private readonly createSemesterRepository: CreateSemesterRepository
  ) {}
  async execute(
    input: CreateSemesterUseCaseInputDTO
  ): Promise<CreateSemesterUseCaseOutputDTO> {
    const semester = new Semester(input);

    const semestersForThisYear =
      await this.findSemesterByYearRepository.findByYear(semester.year);

    const alreadyExists = semestersForThisYear?.some(
      (s) => s.semester === semester.semester && s.type === semester.type
    );

    if (alreadyExists) {
      throw new InvalidResourceError('Semester already exists');
    }

    await this.createSemesterRepository.create(semester);

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
