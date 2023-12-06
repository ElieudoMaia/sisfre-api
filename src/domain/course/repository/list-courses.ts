import { Course } from '../entity/course';

export type ListCoursesRepositoryInput = {
  pageNumber?: number;
  pageSize?: number;
};

export type ListCoursesRepositoryOutput = {
  courses: Course[];
  quantity: number;
};

export interface ListCoursesRepository {
  findAll(
    params: ListCoursesRepositoryInput
  ): Promise<ListCoursesRepositoryOutput>;
}
