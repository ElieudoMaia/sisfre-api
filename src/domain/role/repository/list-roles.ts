export type ListRolesRepositoryOutput = {
  id: string;
  name: string;
}[];

export interface ListRolesRepository {
  listRoles(): Promise<ListRolesRepositoryOutput>;
}
