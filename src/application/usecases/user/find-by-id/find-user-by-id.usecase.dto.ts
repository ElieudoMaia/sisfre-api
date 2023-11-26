import { NotFoundError } from '@/domain/@shared/error/not-found.error';
import { UseCase } from '@/domain/@shared/usecase/usecase.interface';
import { FindUserByIdRepository } from '@/domain/user/repository/find-user-by-id';
import {
  FindUserByIdInputDTO,
  FindUserByIdOutputDTO
} from './find-user-by-id.usecase';

export class FindUserByIdUseCase
  implements UseCase<FindUserByIdInputDTO, FindUserByIdOutputDTO>
{
  constructor(
    private readonly findUserByIdRepository: FindUserByIdRepository
  ) {}

  async execute({ id }: FindUserByIdInputDTO): Promise<FindUserByIdOutputDTO> {
    const user = await this.findUserByIdRepository.findUserById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      nameAbbreviation: user.nameAbbreviation,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}
