import { UseCase } from '@/domain/@shared/usecase/usecase.interface';
import { ListUsersRepository } from '@/domain/user/repository/list-users';
import {
  ListUsersUseCaseInputDTO,
  ListUsersUseCaseOutputDTO
} from './list-users.usecase.dto';

export class ListUsersUseCase
  implements UseCase<ListUsersUseCaseInputDTO, ListUsersUseCaseOutputDTO>
{
  constructor(private readonly listUsersRepository: ListUsersRepository) {}

  async execute(
    params: ListUsersUseCaseInputDTO
  ): Promise<ListUsersUseCaseOutputDTO> {
    const { users, quantity } = await this.listUsersRepository.findAll({
      pageNumber: params.pageNumber,
      pageSize: params.pageSize
    });

    const usersDTO = users.map((user) => ({
      id: user.id,
      name: user.name,
      nameAbbreviation: user.nameAbbreviation,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));

    const { pageNumber, pageSize } = this.getPageAndSizeToReturn(params);

    return {
      users: usersDTO,
      quantity,
      pageNumber,
      pageSize
    };
  }

  private getPageAndSizeToReturn(params: ListUsersUseCaseInputDTO) {
    if (!params.pageNumber || !params.pageSize) {
      return { pageNumber: 1, pageSize: undefined };
    }
    return { pageNumber: params.pageNumber, pageSize: params.pageSize };
  }
}
