import { SchoolSaturday } from '../entity/school-saturday';

export interface CreateSchoolSaturdayRepository {
  create(input: SchoolSaturday): Promise<void>;
}
