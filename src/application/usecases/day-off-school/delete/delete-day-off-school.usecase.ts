import { NotFoundError } from '@/domain/@shared/error/not-found.error';
import { UseCase } from '@/domain/@shared/usecase/usecase.interface';
import { DeleteDayOffSchoolRepository } from '@/domain/day-off-school/repository/delete-day-off-school';
import { FindDayOffSchoolByIdRepository } from '@/domain/day-off-school/repository/find-day-off-school-by-id-repository';
import {
  DeleteDayOffSchoolUseCaseInputDTO,
  DeleteDayOffSchoolUseCaseOutputDTO
} from './delete-day-off-school.usecase.dto';

interface IDeleteDayOffSchoolUseCase
  extends UseCase<
    DeleteDayOffSchoolUseCaseInputDTO,
    DeleteDayOffSchoolUseCaseOutputDTO
  > {}

export class DeleteDayOffSchoolUseCase implements IDeleteDayOffSchoolUseCase {
  constructor(
    private readonly findDayOffSchoolByIdRepository: FindDayOffSchoolByIdRepository,
    private readonly deleteDayOffSchoolRepository: DeleteDayOffSchoolRepository
  ) {}

  async execute(
    data: DeleteDayOffSchoolUseCaseInputDTO
  ): Promise<DeleteDayOffSchoolUseCaseOutputDTO> {
    const DayOffSchool = await this.findDayOffSchoolByIdRepository.findById(
      data.id
    );

    if (!DayOffSchool) {
      throw new NotFoundError(`day off school with id ${data.id} not found`);
    }

    await this.deleteDayOffSchoolRepository.delete(DayOffSchool.id);
  }
}
