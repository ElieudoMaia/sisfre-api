export interface CheckCourseExistsByAcronymRepository {
  checkCourseExistsByAcronym(acronym: string): Promise<boolean>;
}
