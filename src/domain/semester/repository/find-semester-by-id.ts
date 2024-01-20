import { Semester } from '../entity/semester';

export interface FindSemesterByIdRepository {
  findById(id: string): Promise<Semester | null>;
}
