import { Semester } from '../entity/semester';

export interface FindSemesterByYearRepository {
  findByYear(year: number): Promise<Semester | null>;
}
