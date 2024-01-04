import { CreateSchoolSaturdayUseCase } from '@/application/usecases/school-saturday/create/create-school-saturday.usecase';
import { SchoolSaturdayRepository } from '@/infrastructure/school-saturday/repository/school-saturday.repository';

export const makeCreateSchoolSaturdayUseCase =
  (): CreateSchoolSaturdayUseCase => {
    const repo = new SchoolSaturdayRepository();
    return new CreateSchoolSaturdayUseCase(repo, repo);
  };
