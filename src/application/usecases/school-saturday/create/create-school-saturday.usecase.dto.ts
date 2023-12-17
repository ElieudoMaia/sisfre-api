import { DayOfWeek } from '@/domain/school-saturday/entity/school-saturday';

export type CreateSchoolSaturdayUseCaseInputDTO = {
  dayOfWeek: DayOfWeek;
  date: Date;
};

export type CreateSchoolSaturdayUseCaseOutputDTO = {
  id: string;
  dayOfWeek: DayOfWeek;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};
