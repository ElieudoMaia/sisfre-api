import { ListSchoolSaturdaysUseCase } from '@/application/usecases/school-saturday/list/list-school-saturdays.usecase';
import { SchoolSaturdayRepository } from '@/infrastructure/school-saturday/repository/school-saturday.repository';

export const makeListSchoolSaturdaysUseCase =
  (): ListSchoolSaturdaysUseCase => {
    return new ListSchoolSaturdaysUseCase(new SchoolSaturdayRepository());
  };
