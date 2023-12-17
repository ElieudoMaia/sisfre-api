import { SchoolSaturday } from '../entity/school-saturday';

export type ListSchoolSaturdaysRepositoryInput = {
  pageNumber?: number;
  pageSize?: number;
};

export type ListSchoolSaturdaysRepositoryOutput = {
  schoolSaturdays: SchoolSaturday[];
  quantity: number;
};
export interface ListSchoolSaturdaysRepository {
  findAll: (
    params: ListSchoolSaturdaysRepositoryInput
  ) => Promise<ListSchoolSaturdaysRepositoryOutput>;
}
