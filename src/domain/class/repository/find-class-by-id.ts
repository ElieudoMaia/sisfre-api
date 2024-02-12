import { Class } from '../entity/class';

export interface FindClassByIdRepository {
  findById(id: string): Promise<Class | null>;
}
