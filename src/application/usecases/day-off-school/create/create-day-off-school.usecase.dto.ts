import { DayOffSchoolType } from '@/domain/day-off-school/entity/day-off-school';

export type CreateDayOffSchoolUseCaseInputDTO = {
  description: string;
  type: DayOffSchoolType;
  dateBegin: Date;
  dateEnd?: Date;
};

export type CreateDayOffSchoolUseCaseOutputDTO = {
  id: string;
  description: string;
  type: DayOffSchoolType;
  dateBegin: Date;
  dateEnd?: Date;
  createdAt: Date;
  updatedAt: Date;
};
