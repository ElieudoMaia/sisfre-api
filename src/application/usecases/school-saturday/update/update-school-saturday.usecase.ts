import { InvalidResourceError } from '@/domain/@shared/error/invalid-resource.error';
import { SchoolSaturday } from '@/domain/school-saturday/entity/school-saturday';
import { FindSchoolSaturdayByDateRepository } from '@/domain/school-saturday/repository/find-school-saturday-by-date';
import { FindSchoolSaturdayByIdRepository } from '@/domain/school-saturday/repository/find-school-saturday-by-id';
import { UpdateSchoolSaturdayRepository } from '@/domain/school-saturday/repository/update-school-saturday';
import {
  UpdateSchoolSaturdayUseCaseInputDTO,
  UpdateSchoolSaturdayUseCaseOutputDTO
} from './update-school-saturday.usecase.dto';

export class UpdateSchoolSaturdayUseCase {
  constructor(
    private readonly findSchoolSaturdayByIdRepository: FindSchoolSaturdayByIdRepository,
    private readonly findSchoolSaturdayByDateRepository: FindSchoolSaturdayByDateRepository,
    private readonly updateSchoolSaturdayRepository: UpdateSchoolSaturdayRepository
  ) {}
  async execute(
    input: UpdateSchoolSaturdayUseCaseInputDTO
  ): Promise<UpdateSchoolSaturdayUseCaseOutputDTO> {
    const savedSchoolSaturday =
      await this.findSchoolSaturdayByIdRepository.findById(input.id);
    if (!savedSchoolSaturday) {
      throw new InvalidResourceError('school saturday not found');
    }

    const schoolSaturday = new SchoolSaturday({
      id: input.id,
      referringTo: input.referringTo,
      date: input.date,
      createdAt: savedSchoolSaturday.createdAt,
      updatedAt: new Date()
    });

    const nothingChanged =
      savedSchoolSaturday.referringTo === schoolSaturday.referringTo &&
      savedSchoolSaturday.date === schoolSaturday.date;
    if (nothingChanged) {
      throw new InvalidResourceError('nothing changed');
    }

    const schoolSaturdayAlreadyExists =
      await this.findSchoolSaturdayByDateRepository.findByDate(
        schoolSaturday.date
      );
    if (
      schoolSaturdayAlreadyExists &&
      schoolSaturdayAlreadyExists.id !== input.id
    ) {
      throw new InvalidResourceError(
        'already exists a school saturday on date'
      );
    }

    await this.updateSchoolSaturdayRepository.update(schoolSaturday);

    return {
      id: schoolSaturday.id,
      referringTo: schoolSaturday.referringTo,
      date: schoolSaturday.date,
      createdAt: schoolSaturday.createdAt,
      updatedAt: schoolSaturday.updatedAt
    };
  }
}
