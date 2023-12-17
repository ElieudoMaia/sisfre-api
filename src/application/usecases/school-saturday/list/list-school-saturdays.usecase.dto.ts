import { ReferencedDayOfWeek } from '@/domain/school-saturday/entity/school-saturday';

export type ListSchoolSaturdaysUseCaseInputDTO = {
  pageNumber?: number;
  pageSize?: number;
};

export type ListSchoolSaturdaysUseCaseOutputDTO = {
  schoolSaturdays: {
    id: string;
    referringTo: ReferencedDayOfWeek;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
  }[];
  quantity: number;
  pageNumber: number;
  pageSize?: number;
};
