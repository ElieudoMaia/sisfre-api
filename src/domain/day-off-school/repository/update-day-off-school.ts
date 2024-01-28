import { DayOffSchool } from '../entity/day-off-school';

export interface UpdateDayOffSchoolRepository {
  update: (dayOffSchool: DayOffSchool) => Promise<void>;
}
