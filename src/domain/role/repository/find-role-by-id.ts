import { Role } from '../entity/role';

export type FindRoleByIdRepositoryInput = {
  id: string;
};

export type FindRoleByIdRepositoryOutput = Role | null;

export interface FindRoleByIdRepository {
  findById(
    input: FindRoleByIdRepositoryInput
  ): Promise<FindRoleByIdRepositoryOutput>;
}
