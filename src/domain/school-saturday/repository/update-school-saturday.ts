import { SchoolSaturday } from '../entity/school-saturday';

export interface UpdateSchoolSaturdayRepository {
  update(input: SchoolSaturday): Promise<void>;
}
