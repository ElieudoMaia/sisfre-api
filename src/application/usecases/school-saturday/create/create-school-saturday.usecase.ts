import { InvalidResourceError } from '@/domain/@shared/error/invalid-resource.error';
import { SchoolSaturday } from '@/domain/school-saturday/entity/school-saturday';
import { CreateSchoolSaturdayRepository } from '@/domain/school-saturday/repository/create-school-saturday';
import { FindSchoolSaturdayByDateRepository } from '@/domain/school-saturday/repository/find-school-saturday-by-date';
import {
  CreateSchoolSaturdayUseCaseInputDTO,
  CreateSchoolSaturdayUseCaseOutputDTO
} from './create-school-saturday.usecase.dto';

export class CreateSchoolSaturdayUseCase {
  constructor(
    private readonly findSchoolSaturdayByDateRepository: FindSchoolSaturdayByDateRepository,
    private readonly createSchoolSaturdayRepository: CreateSchoolSaturdayRepository
  ) {}
  async execute(
    input: CreateSchoolSaturdayUseCaseInputDTO
  ): Promise<CreateSchoolSaturdayUseCaseOutputDTO> {
    const schoolSaturday = new SchoolSaturday(input);

    const schoolSaturdayAlreadyExists =
      await this.findSchoolSaturdayByDateRepository.findByDate(
        schoolSaturday.date
      );
    if (schoolSaturdayAlreadyExists) {
      throw new InvalidResourceError(
        'already exists a school saturday on date'
      );
    }

    await this.createSchoolSaturdayRepository.create(schoolSaturday);

    return {
      id: schoolSaturday.id,
      referringTo: schoolSaturday.referringTo,
      date: schoolSaturday.date,
      createdAt: schoolSaturday.createdAt,
      updatedAt: schoolSaturday.updatedAt
    };
  }
}
