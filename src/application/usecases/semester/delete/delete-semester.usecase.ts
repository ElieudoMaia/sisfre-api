import { NotFoundError } from '@/domain/@shared/error/not-found.error';
import { UseCase } from '@/domain/@shared/usecase/usecase.interface';
import { DeleteSemesterRepository } from '@/domain/semester/repository/delete-semester';
import { FindSemesterByIdRepository } from '@/domain/semester/repository/find-semester-by-id';
import {
  DeleteSemesterUseCaseInputDTO,
  DeleteSemesterUseCaseOutputDTO
} from './delete-semester.usecase.dto';

interface IDeleteSemesterUseCase
  extends UseCase<
    DeleteSemesterUseCaseInputDTO,
    DeleteSemesterUseCaseOutputDTO
  > {}

export class DeleteSemesterUseCase implements IDeleteSemesterUseCase {
  constructor(
    private readonly findSemesterByIdRepository: FindSemesterByIdRepository,
    private readonly deleteSemesterRepository: DeleteSemesterRepository
  ) {}

  async execute(
    data: DeleteSemesterUseCaseInputDTO
  ): Promise<DeleteSemesterUseCaseOutputDTO> {
    const semester = await this.findSemesterByIdRepository.findById(data.id);

    if (!semester)
      throw new NotFoundError(`Semester with id ${data.id} not found`);

    await this.deleteSemesterRepository.delete(semester.id);
  }
}
