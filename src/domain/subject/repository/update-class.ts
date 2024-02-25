import { Class } from '../entity/subject';

export interface UpdateClassRepository {
  update(schoolClass: Class): Promise<void>;
}
