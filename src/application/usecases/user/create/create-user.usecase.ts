import { InvalidResourceError } from '@/domain/@shared/error/invalid-resource.error';
import { FindRoleByIdRepository } from '@/domain/role/repository/find-role-by-id';
import { User } from '@/domain/user/entity/user';
import { Hasher } from '@/domain/user/gateway/hasher';
import { CreateUserRepository } from '@/domain/user/repository/create-use';
import { FindUserByNameAbbreviationRepository } from '@/domain/user/repository/find-user-by-abbreviation-name';
import { FindUserByEmailRepository } from '@/domain/user/repository/find-user-by-email';
import {
  CreateUserUseCaseInputDTO,
  CreateUserUseCaseOutputDTO
} from './create-user.usecase.dto';

export class CreateUserUseCase {
  constructor(
    private readonly findRoleByIdRepository: FindRoleByIdRepository,
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly findUserByNameAbbreviationRepository: FindUserByNameAbbreviationRepository,
    private readonly createUserRepository: CreateUserRepository,
    private readonly hasher: Hasher
  ) {}
  async execute(
    input: CreateUserUseCaseInputDTO
  ): Promise<CreateUserUseCaseOutputDTO> {
    const role = await this.findRoleByIdRepository.findById({
      id: input.roleId
    });
    if (!role) {
      throw new InvalidResourceError(`Role with id ${input.roleId} not found`);
    }

    const userByEmail = await this.findUserByEmailRepository.findUserByEmail({
      email: input.email
    });
    if (userByEmail) {
      throw new InvalidResourceError(
        `User with email ${userByEmail.email} already exists`
      );
    }

    const userByAbbreviationName =
      await this.findUserByNameAbbreviationRepository.findByAbbreviationName({
        abbreviationName: input.nameAbreviation
      });
    if (userByAbbreviationName) {
      throw new InvalidResourceError(
        'User name abbreviation already registered'
      );
    }

    if (input.password.trim() !== input.passwordConfirmation.trim()) {
      throw new InvalidResourceError(
        'Password and password confirmation differ'
      );
    }

    const hashedPassword = await this.hasher.hash(input.password);

    const user = new User({
      name: input.name,
      nameAbreviation: input.nameAbreviation,
      email: input.email,
      password: hashedPassword
    });

    user.changeRole(role);

    await this.createUserRepository.create(user);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      nameAbreviation: user.nameAbreviation,
      roleId: input.roleId
    };
  }
}
