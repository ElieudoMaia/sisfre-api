import { ReferencedDayOfWeek } from '@/domain/school-saturday/entity/school-saturday';

export type CreateSchoolSaturdayUseCaseInputDTO = {
  referringTo: ReferencedDayOfWeek;
  date: Date;
};

export type CreateSchoolSaturdayUseCaseOutputDTO = {
  id: string;
  referringTo: ReferencedDayOfWeek;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};
