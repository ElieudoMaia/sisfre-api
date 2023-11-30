import { InvalidResourceError } from '@/domain/@shared/error/invalid-resource.error';
import { NotFoundError } from '@/domain/@shared/error/not-found.error';
import { FindUserByNameAbbreviationRepository } from '@/domain/user/repository/find-user-by-abbreviation-name';
import { FindUserByEmailRepository } from '@/domain/user/repository/find-user-by-email';
import { FindUserByIdRepository } from '@/domain/user/repository/find-user-by-id';
import { UpdateUserRepository } from '@/domain/user/repository/update-user';
import {
  UpdateUserUseCaseInputDTO,
  UpdateUserUseCaseOutputDTO
} from './update-user.usecase.dto';

export class UpdateUserUseCase {
  constructor(
    private readonly findUserByIdUseCase: FindUserByIdRepository,
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly findUserByNameAbbreviationRepository: FindUserByNameAbbreviationRepository,
    private readonly updateUserRepository: UpdateUserRepository
  ) {}

  async execute(
    input: UpdateUserUseCaseInputDTO
  ): Promise<UpdateUserUseCaseOutputDTO> {
    const user = await this.findUserByIdUseCase.findUserById(input.id);
    if (!user) throw new NotFoundError('User not found');

    const userWithSameEmail =
      await this.findUserByEmailRepository.findUserByEmail({
        email: input.email
      });

    if (userWithSameEmail && userWithSameEmail.id !== user.id) {
      throw new InvalidResourceError(
        `User with email ${userWithSameEmail.email} already exists`
      );
    }

    const userWithSameAbbreviationName =
      await this.findUserByNameAbbreviationRepository.findByAbbreviationName({
        abbreviationName: input.nameAbbreviation
      });
    if (
      userWithSameAbbreviationName &&
      userWithSameAbbreviationName.id !== user.id
    ) {
      throw new InvalidResourceError(
        'User name abbreviation already registered'
      );
    }

    user.name = input.name;
    user.nameAbbreviation = input.nameAbbreviation;
    user.email = input.email;
    user.role = input.role;

    await this.updateUserRepository.updateUser(user);

    return {
      id: user.id,
      name: user.name,
      nameAbbreviation: user.nameAbbreviation,
      email: user.email,
      role: user.role
    };
  }
}
