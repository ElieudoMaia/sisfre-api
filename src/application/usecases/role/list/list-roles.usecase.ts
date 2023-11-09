import { ListRolesRepository } from '@/domain/role/repository/list-roles';
import { ListRolesUseCaseOutputDTO } from './list-roles.usecase.dto';

export class ListRolesUseCase {
  constructor(private readonly listRolesRepository: ListRolesRepository) {}

  async execute(): Promise<ListRolesUseCaseOutputDTO> {
    const roles = await this.listRolesRepository.listRoles();
    return roles.map((role) => ({
      id: role.id,
      name: role.name
    }));
  }
}
