import { FindSchoolSaturdayByIdUseCase } from '@/application/usecases/school-saturday/find-by-id/find-school-saturday-by-id.usecase';
import { SchoolSaturdayRepository } from '@/infrastructure/school-saturday/repository/school-saturday.repository';

export const makeFindSchoolSaturdayByIdUseCase =
  (): FindSchoolSaturdayByIdUseCase => {
    return new FindSchoolSaturdayByIdUseCase(new SchoolSaturdayRepository());
  };
