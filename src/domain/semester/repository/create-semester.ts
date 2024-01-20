import { Semester } from '../entity/semester';

export interface CreateSemesterRepository {
  create(semester: Semester): Promise<void>;
}
