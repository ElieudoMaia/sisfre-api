import { NotFoundError } from '@/domain/@shared/error/not-found.error';
import { UseCase } from '@/domain/@shared/usecase/usecase.interface';
import { DeleteSchoolSaturdayRepository } from '@/domain/school-saturday/repository/delete-school-saturday';
import { FindSchoolSaturdayByIdRepository } from '@/domain/school-saturday/repository/find-school-saturday-by-id';
import {
  DeleteSchoolSaturdayUseCaseInputDTO,
  DeleteSchoolSaturdayUseCaseOutputDTO
} from './delete-school-saturday.usecase.dto';

interface IDeleteSchoolSaturdayUseCase
  extends UseCase<
    DeleteSchoolSaturdayUseCaseInputDTO,
    DeleteSchoolSaturdayUseCaseOutputDTO
  > {}

export class DeleteSchoolSaturdayUseCase
  implements IDeleteSchoolSaturdayUseCase
{
  constructor(
    private readonly findSchoolSaturdayByIdRepository: FindSchoolSaturdayByIdRepository,
    private readonly deleteSchoolSaturdayRepository: DeleteSchoolSaturdayRepository
  ) {}

  async execute(
    data: DeleteSchoolSaturdayUseCaseInputDTO
  ): Promise<DeleteSchoolSaturdayUseCaseOutputDTO> {
    const schoolSaturday = await this.findSchoolSaturdayByIdRepository.findById(
      data.id
    );

    if (!schoolSaturday)
      throw new NotFoundError(`School Saturday with id ${data.id} not found`);

    await this.deleteSchoolSaturdayRepository.delete(schoolSaturday.id);
  }
}
