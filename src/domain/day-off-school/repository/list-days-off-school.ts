import { DayOffSchool } from '../entity/day-off-school';

export type ListDaysOffSchoolRepositoryInput = {
  pageNumber?: number;
  pageSize?: number;
  description?: string;
};

export type ListDaysOffSchoolRepositoryOutput = {
  daysOffSchool: DayOffSchool[];
  quantity: number;
};

export interface ListDaysOffSchoolRepository {
  findAll: (
    params: ListDaysOffSchoolRepositoryInput
  ) => Promise<ListDaysOffSchoolRepositoryOutput>;
}
