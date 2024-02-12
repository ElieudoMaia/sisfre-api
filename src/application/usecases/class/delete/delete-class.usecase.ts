import { NotFoundError } from '@/domain/@shared/error/not-found.error';
import { UseCase } from '@/domain/@shared/usecase/usecase.interface';
import { DeleteClassRepository } from '@/domain/class/repository/delete-class';
import { FindClassByIdRepository } from '@/domain/class/repository/find-class-by-id';
import {
  DeleteClassUseCaseInputDTO,
  DeleteClassUseCaseOutputDTO
} from './delete-class.usecase.dto';

interface IDeleteClassUseCase
  extends UseCase<DeleteClassUseCaseInputDTO, DeleteClassUseCaseOutputDTO> {}

export class DeleteClassUseCase implements IDeleteClassUseCase {
  constructor(
    private readonly findClassByIdRepository: FindClassByIdRepository,
    private readonly deleteClassRepository: DeleteClassRepository
  ) {}

  async execute(
    data: DeleteClassUseCaseInputDTO
  ): Promise<DeleteClassUseCaseOutputDTO> {
    const schoolClasse = await this.findClassByIdRepository.findById(data.id);

    if (!schoolClasse) {
      throw new NotFoundError(`class with id ${data.id} not found`);
    }

    await this.deleteClassRepository.delete(schoolClasse.id);
  }
}
