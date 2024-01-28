import { DayOffSchoolType } from '@/domain/day-off-school/entity/day-off-school';

export type UpdateDayOffSchoolUseCaseInputDTO = {
  id: string;
  description: string;
  type: DayOffSchoolType;
  dateBegin: Date;
  dateEnd?: Date;
};

export type UpdateDayOffSchoolUseCaseOutputDTO = {
  id: string;
  description: string;
  type: DayOffSchoolType;
  dateBegin: Date;
  dateEnd?: Date;
  createdAt: Date;
  updatedAt: Date;
};
