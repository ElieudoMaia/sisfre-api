import { DayOffSchool } from '../entity/day-off-school';

export interface FindDayOffSchoolByIdRepository {
  findById(id: string): Promise<DayOffSchool | null | undefined>;
}
