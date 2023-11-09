import { ListRolesUseCase } from '@/application/usecases/role/list/list-roles.usecase';
import { RoleRepository } from '@/infrastructure/role/repository/role.repository';

export const makeListRolesUseCase = (): ListRolesUseCase => {
  const roleRepository = new RoleRepository();
  return new ListRolesUseCase(roleRepository);
};
