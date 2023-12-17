import { ReferencedDayOfWeek } from '@/domain/school-saturday/entity/school-saturday';

export type UpdateSchoolSaturdayUseCaseInputDTO = {
  id: string;
  referringTo: ReferencedDayOfWeek;
  date: Date;
};

export type UpdateSchoolSaturdayUseCaseOutputDTO = {
  id: string;
  referringTo: ReferencedDayOfWeek;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};
