import { User } from '../entity/user';

export type ListUsersRepositoryInput = {
  pageNumber?: number;
  pageSize?: number;
};

export type ListUsersRepositoryOutput = {
  users: User[];
  quantity: number;
};

export interface ListUsersRepository {
  findAll(params: ListUsersRepositoryInput): Promise<ListUsersRepositoryOutput>;
}
