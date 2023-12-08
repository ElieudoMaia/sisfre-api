import { CourseType } from '../entity/course';

export type CheckCourseExistsByNameRepositoryOutput =
  | {
      id: string;
      name: string;
      type: CourseType;
    }
  | undefined;

export interface CheckCourseExistsByNameRepository {
  checkCourseExistsByName(
    name: string
  ): Promise<CheckCourseExistsByNameRepositoryOutput>;
}
