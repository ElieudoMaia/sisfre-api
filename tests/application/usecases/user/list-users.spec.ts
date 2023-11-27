import { ListUsersUseCase } from '@/application/usecases/user/list/list-users.usecase';
import { User, UserRole } from '@/domain/user/entity/user';
import { ListUsersRepository } from '@/domain/user/repository/list-users';
import { describe, expect, it, vi } from 'vitest';
import { fake } from '../../../utils/fake-data-generator';

const makeFakeUser = ({
  isActive = true,
  role = 'ADMINISTRATOR' as UserRole
} = {}) => {
  return new User({
    id: fake.uuid(),
    name: fake.name(),
    email: fake.email(),
    password: fake.password(),
    nameAbbreviation: 'ABCD',
    isActive,
    role,
    createdAt: new Date(),
    updatedAt: new Date()
  });
};

const makeListUsersRepository = () => ({
  findAll: vi.fn().mockResolvedValue({ users: [], quantity: 0 })
});

type SutTypes = {
  sut: ListUsersUseCase;
  listUsersRepository: ListUsersRepository;
};

const makeSut = (): SutTypes => {
  const listUsersRepository = makeListUsersRepository();
  const sut = new ListUsersUseCase(listUsersRepository);
  return {
    sut,
    listUsersRepository
  };
};

describe('ListUsersUseCase', () => {
  it('should call ListUsersRepository with correct params', async () => {
    const { sut, listUsersRepository } = makeSut();
    await sut.execute({});
    expect(listUsersRepository.findAll).toHaveBeenCalledWith({});
    await sut.execute({ pageNumber: 1 });
    expect(listUsersRepository.findAll).toHaveBeenCalledWith({ pageNumber: 1 });
    await sut.execute({ pageSize: 10 });
    expect(listUsersRepository.findAll).toHaveBeenCalledWith({ pageSize: 10 });
    await sut.execute({ pageNumber: 1, pageSize: 10 });
    expect(listUsersRepository.findAll).toHaveBeenCalledWith({
      pageNumber: 1,
      pageSize: 10
    });
  });

  it('should throw if ListUsersRepository throws', async () => {
    const { sut, listUsersRepository } = makeSut();
    vi.spyOn(listUsersRepository, 'findAll').mockRejectedValueOnce(
      new Error('repo error')
    );
    await expect(sut.execute({})).rejects.toThrow('repo error');
  });

  it('should return correct data when there is no data', async () => {
    const { sut } = makeSut();
    const result = await sut.execute({});
    expect(result).toEqual({
      users: [],
      quantity: 0,
      pageNumber: 1,
      pageSize: undefined
    });
  });

  it('should return the correct data', async () => {
    const { sut, listUsersRepository } = makeSut();
    const user1 = makeFakeUser();
    const user2 = makeFakeUser();
    vi.spyOn(listUsersRepository, 'findAll').mockResolvedValueOnce({
      users: [user1, user2],
      quantity: 2
    });
    const result = await sut.execute({
      pageNumber: 1,
      pageSize: 50
    });
    expect(result.quantity).toBe(2);
    expect(result.pageNumber).toBe(1);
    expect(result.pageSize).toBe(50);
    expect(result.users.length).toBe(2);
    expect(result.users[0]).toEqual(
      expect.objectContaining({
        id: user1.id,
        name: user1.name,
        nameAbbreviation: user1.nameAbbreviation,
        email: user1.email,
        role: user1.role,
        createdAt: user1.createdAt,
        updatedAt: user1.updatedAt
      })
    );
    expect(result.users[1]).toEqual(
      expect.objectContaining({
        id: user2.id,
        name: user2.name,
        nameAbbreviation: user2.nameAbbreviation,
        email: user2.email,
        role: user2.role,
        createdAt: user2.createdAt,
        updatedAt: user2.updatedAt
      })
    );
  });
});
