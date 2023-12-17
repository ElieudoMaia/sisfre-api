import { SchoolSaturday } from '../entity/school-saturday';

export interface FindSchoolSaturdayByDateRepository {
  findByDate(date: Date): Promise<SchoolSaturday | null | undefined>;
}
