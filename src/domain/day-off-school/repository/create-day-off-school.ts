import { DayOffSchool } from '../entity/day-off-school';

export interface CreateDayOffSchoolRepository {
  create(dayOffSchool: DayOffSchool): Promise<void>;
}
