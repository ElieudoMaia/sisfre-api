import { DayOfWeek } from '@/domain/school-saturday/entity/school-saturday';

export type UpdateSchoolSaturdayUseCaseInputDTO = {
  id: string;
  dayOfWeek: DayOfWeek;
  date: Date;
};

export type UpdateSchoolSaturdayUseCaseOutputDTO = {
  id: string;
  dayOfWeek: DayOfWeek;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};
