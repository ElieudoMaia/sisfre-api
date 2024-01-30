import { DayOffSchoolType } from '@/domain/day-off-school/entity/day-off-school';

export type FindDayOffSchoolByIdInputDTO = {
  id: string;
};

export type FindDayOffSchoolByIdOutputDTO = {
  id: string;
  description: string;
  type: DayOffSchoolType;
  dateBegin: Date;
  dateEnd?: Date;
  createdAt: Date;
  updatedAt: Date;
};
