import { User } from '../entity/user';

export type Output = User | null;

export interface FindUserByIdRepository {
  findUserById(id: string): Promise<Output>;
}
