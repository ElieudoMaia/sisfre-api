import { DayOffSchoolType } from '@/domain/day-off-school/entity/day-off-school';

export type ListDaysOffSchoolUseCaseInputDTO = {
  pageNumber?: number;
  pageSize?: number;
  description?: string;
};

export type ListDaysOffSchoolUseCaseOutputDTO = {
  daysOffSchool: {
    id: string;
    description: string;
    type: DayOffSchoolType;
    dateBegin: Date;
    dateEnd?: Date;
    createdAt: Date;
    updatedAt: Date;
  }[];
  quantity: number;
  pageNumber: number;
  pageSize?: number;
};
