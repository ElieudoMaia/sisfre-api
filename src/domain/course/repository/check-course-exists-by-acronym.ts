import { CourseType } from '../entity/course';

export type CheckCourseExistsByAcronymRepositoryOutput = {
  id: string;
  name: string;
  type: CourseType;
};

export interface CheckCourseExistsByAcronymRepository {
  checkCourseExistsByAcronym(
    acronym: string
  ): Promise<CheckCourseExistsByAcronymRepositoryOutput>;
}
