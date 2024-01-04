import { DeleteSchoolSaturdayUseCase } from '@/application/usecases/school-saturday/delete/delete-school-saturday.usecase';
import { SchoolSaturdayRepository } from '@/infrastructure/school-saturday/repository/school-saturday.repository';

export const makeDeleteSchoolSaturdayUsecase =
  (): DeleteSchoolSaturdayUseCase => {
    const repo = new SchoolSaturdayRepository();
    return new DeleteSchoolSaturdayUseCase(repo, repo);
  };
