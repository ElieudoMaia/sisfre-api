import { Role } from '@/domain/role/entity/role';
import {
  FindRoleByIdRepository,
  FindRoleByIdRepositoryInput,
  FindRoleByIdRepositoryOutput
} from '@/domain/role/repository/find-role-by-id';
import {
  ListRolesRepository,
  ListRolesRepositoryOutput
} from '@/domain/role/repository/list-roles';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class RoleRepository
  implements FindRoleByIdRepository, ListRolesRepository
{
  async listRoles(): Promise<ListRolesRepositoryOutput> {
    const roles = await prisma.role.findMany({
      select: {
        id: true,
        name: true
      }
    });

    return roles.map((role) => ({
      id: role.id,
      name: role.name
    }));
  }

  async findById(
    input: FindRoleByIdRepositoryInput
  ): Promise<FindRoleByIdRepositoryOutput> {
    const role = await prisma.role.findUnique({
      where: {
        id: input.id
      }
    });

    if (!role) return null;

    return new Role({
      id: role.id,
      name: role.name,
      createdAt: role.created_at,
      updatedAt: role.updated_at
    });
  }
}
