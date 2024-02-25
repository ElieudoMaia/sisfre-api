import { Class } from '../entity/subject';

export interface FindClassByIdRepository {
  findById(id: string): Promise<Class | null>;
}
