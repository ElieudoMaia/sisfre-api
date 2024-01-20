import { Semester } from '../entity/semester';

export type ListSemestersRepositoryInput = {
  pageNumber?: number;
  pageSize?: number;
};

export type ListSemestersRepositoryOutput = {
  semesters: Semester[];
  quantity: number;
};

export interface ListSemestersRepository {
  findAll(
    params: ListSemestersRepositoryInput
  ): Promise<ListSemestersRepositoryOutput>;
}
