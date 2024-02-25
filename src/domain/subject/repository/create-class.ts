import { Class } from '../entity/subject';

export interface CreateClassRepository {
  create(schoolClass: Class): Promise<void>;
}
