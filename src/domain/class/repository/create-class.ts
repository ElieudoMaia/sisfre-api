import { Class } from '../entity/class';

export interface CreateClassRepository {
  create(schoolClass: Class): Promise<void>;
}
