import { User, UserRole } from '@/domain/user/entity/user';
import { CreateUserRepository } from '@/domain/user/repository/create-use';
import {
  FindUserByNameAbbreviationRepository,
  FindUserByNameAbbreviationRepositoryInput,
  FindUserByNameAbbreviationRepositoryOutput
} from '@/domain/user/repository/find-user-by-abbreviation-name';
import {
  FindUserByEmailRepository,
  Input,
  Output
} from '@/domain/user/repository/find-user-by-email';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export class UserRepository
  implements
    FindUserByEmailRepository,
    FindUserByNameAbbreviationRepository,
    CreateUserRepository
{
  async create(input: User): Promise<void> {
    await prisma.user.create({
      data: {
        id: input.id,
        name: input.name,
        name_abbreviation: input.nameAbbreviation,
        email: input.email,
        password: input.password,
        role: input.role,
        created_at: input.createdAt,
        updated_at: input.updatedAt
      }
    });
  }

  async findUserByEmail(input: Input): Promise<Output> {
    const user = await prisma.user.findUnique({
      where: {
        email: input.email
      }
    });

    if (!user) return null;

    return new User({
      id: user.id,
      name: user.name,
      nameAbbreviation: user.name_abbreviation,
      email: user.email,
      password: user.password,
      role: user.role as UserRole,
      isActive: user.is_active,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    });
  }

  async findByAbbreviationName(
    input: FindUserByNameAbbreviationRepositoryInput
  ): Promise<FindUserByNameAbbreviationRepositoryOutput> {
    const user = await prisma.user.findUnique({
      where: {
        name_abbreviation: input.abbreviationName
      }
    });

    if (!user) return null;

    return new User({
      id: user.id,
      name: user.name,
      nameAbbreviation: user.name_abbreviation,
      email: user.email,
      role: user.role as UserRole,
      isActive: user.is_active,
      password: user.password,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    });
  }
}
