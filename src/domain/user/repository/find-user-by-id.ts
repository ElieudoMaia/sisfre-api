import { User } from '../entity/user';

export type FindUserByIdRepositoryOutput = User | null;

export interface FindUserByIdRepository {
  findUserById(id: string): Promise<FindUserByIdRepositoryOutput>;
}
