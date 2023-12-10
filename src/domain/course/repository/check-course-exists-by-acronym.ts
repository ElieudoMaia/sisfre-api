import { CourseType } from '../entity/course';

export type CheckCourseExistsByAcronymRepositoryOutput =
  | {
      id: string;
      name: string;
      type: CourseType;
    }
  | null
  | undefined;

export interface CheckCourseExistsByAcronymRepository {
  checkCourseExistsByAcronym(
    acronym: string
  ): Promise<CheckCourseExistsByAcronymRepositoryOutput>;
}
