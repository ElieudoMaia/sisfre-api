import { Class } from '../entity/class';

export type ListClassesRepositoryInput = {
  pageNumber?: number;
  pageSize?: number;
  description?: string;
};

export type ListClassesRepositoryOutput = {
  classes: Class[];
  quantity: number;
};

export interface ListClassesRepository {
  findAll: (
    params: ListClassesRepositoryInput
  ) => Promise<ListClassesRepositoryOutput>;
}
