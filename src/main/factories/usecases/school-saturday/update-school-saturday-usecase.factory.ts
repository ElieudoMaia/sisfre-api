import { UpdateSchoolSaturdayUseCase } from '@/application/usecases/school-saturday/update/update-school-saturday.usecase';
import { SchoolSaturdayRepository } from '@/infrastructure/school-saturday/repository/school-saturday.repository';

export const makeUpdateSchoolSaturdayUseCase =
  (): UpdateSchoolSaturdayUseCase => {
    const schoolSaturdayRepository = new SchoolSaturdayRepository();
    return new UpdateSchoolSaturdayUseCase(
      schoolSaturdayRepository,
      schoolSaturdayRepository,
      schoolSaturdayRepository
    );
  };
