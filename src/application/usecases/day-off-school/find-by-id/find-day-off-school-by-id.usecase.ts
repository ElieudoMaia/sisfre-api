import { NotFoundError } from '@/domain/@shared/error/not-found.error';
import { UseCase } from '@/domain/@shared/usecase/usecase.interface';
import { FindDayOffSchoolByIdRepository } from '@/domain/day-off-school/repository/find-day-off-school-by-id-repository';
import {
  FindDayOffSchoolByIdInputDTO,
  FindDayOffSchoolByIdOutputDTO
} from './find-day-off-school-by-id.usecase.dto';

interface IFindDayOffSchoolByIdUseCase
  extends UseCase<
    FindDayOffSchoolByIdInputDTO,
    FindDayOffSchoolByIdOutputDTO
  > {}

export class FindDayOffSchoolByIdUseCase
  implements IFindDayOffSchoolByIdUseCase
{
  constructor(
    private readonly findDayOffSchoolByIdRepository: FindDayOffSchoolByIdRepository
  ) {}

  async execute({
    id
  }: FindDayOffSchoolByIdInputDTO): Promise<FindDayOffSchoolByIdOutputDTO> {
    const dayOffSchool = await this.findDayOffSchoolByIdRepository.findById(id);

    if (!dayOffSchool) {
      throw new NotFoundError('day off school not found');
    }

    return {
      id: dayOffSchool.id,
      description: dayOffSchool.description,
      type: dayOffSchool.type,
      dateBegin: dayOffSchool.dateBegin,
      dateEnd: dayOffSchool.dateEnd,
      createdAt: dayOffSchool.createdAt,
      updatedAt: dayOffSchool.updatedAt
    };
  }
}
