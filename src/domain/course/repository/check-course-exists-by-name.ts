export interface CheckCourseExistsByNameRepository {
  checkCourseExistsByName(nam: string): Promise<boolean>;
}
