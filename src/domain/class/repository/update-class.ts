import { Class } from '../entity/class';

export interface UpdateClassRepository {
  update(schoolClass: Class): Promise<void>;
}
