import { DayOffSchool } from '../entity/day-off-school';

export interface FindRecessOrVocationInDateRangeRepository {
  findInRange: (
    dateBegin: Date,
    dateEnd: Date
  ) => Promise<DayOffSchool[] | null>;
}
