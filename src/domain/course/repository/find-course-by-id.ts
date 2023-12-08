import { Course } from '../entity/course';

export type FindCourseByIdRepositoryOutput = Course | undefined;

export interface FindCourseByIdRepository {
  findCourseById: (id: string) => Promise<FindCourseByIdRepositoryOutput>;
}
