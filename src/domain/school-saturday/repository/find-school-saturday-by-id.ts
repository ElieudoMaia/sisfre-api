import { SchoolSaturday } from '../entity/school-saturday';

export interface FindSchoolSaturdayByIdRepository {
  findById(id: string): Promise<SchoolSaturday | null | undefined>;
}
