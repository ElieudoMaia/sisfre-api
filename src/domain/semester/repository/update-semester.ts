import { Semester } from '../entity/semester';

export interface UpdateSemesterRepository {
  update(semester: Semester): Promise<void>;
}
