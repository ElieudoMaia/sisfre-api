import { NotFoundError } from '@/domain/@shared/error/not-found.error';
import { UseCase } from '@/domain/@shared/usecase/usecase.interface';
import { FindSchoolSaturdayByIdRepository } from '@/domain/school-saturday/repository/find-school-saturday-by-id';
import {
  FindSchoolSaturdayByIdInputDTO,
  FindSchoolSaturdayByIdOutputDTO
} from './find-school-saturday-by-id.usecase.dto';

export class FindSchoolSaturdayByIdUseCase
  implements
    UseCase<FindSchoolSaturdayByIdInputDTO, FindSchoolSaturdayByIdOutputDTO>
{
  constructor(
    private readonly findSchoolSaturdayByIdRepository: FindSchoolSaturdayByIdRepository
  ) {}

  async execute({
    id
  }: FindSchoolSaturdayByIdInputDTO): Promise<FindSchoolSaturdayByIdOutputDTO> {
    const schoolSaturday =
      await this.findSchoolSaturdayByIdRepository.findById(id);

    if (!schoolSaturday) {
      throw new NotFoundError('school saturday not found');
    }

    return {
      id: schoolSaturday.id,
      dayOfWeek: schoolSaturday.dayOfWeek,
      date: schoolSaturday.date,
      createdAt: schoolSaturday.createdAt,
      updatedAt: schoolSaturday.updatedAt
    };
  }
}
