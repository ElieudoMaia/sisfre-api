import { FindUserByIdUseCase } from '@/application/usecases/user/find-by-id/find-user-by-id.usecase';
import { User, UserRole } from '@/domain/user/entity/user';
import { FindUserByIdRepository } from '@/domain/user/repository/find-user-by-id';
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

const makeFindUserByIdRepository = () => ({
  findUserById: vi.fn().mockResolvedValue(makeFakeUser())
});

type SutType = {
  findUserByIdRepository: FindUserByIdRepository;
  sut: FindUserByIdUseCase;
};

const makeSut = (): SutType => {
  const findUserByIdRepository = makeFindUserByIdRepository();
  const sut = new FindUserByIdUseCase(findUserByIdRepository);
  return {
    findUserByIdRepository,
    sut
  };
};

describe('FindUserByIdUseCase', () => {
  it('should call FindUserByIdRepository with correct params', async () => {
    const { sut, findUserByIdRepository } = makeSut();
    const findUserByIdSpy = findUserByIdRepository.findUserById;
    const id = fake.uuid();
    await sut.execute({ id });
    expect(findUserByIdSpy).toHaveBeenCalledWith(id);
  });

  it('should throw if FindUserByIdRepository throws', async () => {
    const { sut, findUserByIdRepository } = makeSut();
    const findUserByIdSpy = vi.spyOn(findUserByIdRepository, 'findUserById');
    const id = fake.uuid();
    findUserByIdSpy.mockRejectedValueOnce(new Error('mock'));
    await expect(sut.execute({ id })).rejects.toThrow(new Error('mock'));
  });

  it('should throw if FindUserByIdRepository returns null', async () => {
    const { sut, findUserByIdRepository } = makeSut();
    const findUserByIdSpy = vi.spyOn(findUserByIdRepository, 'findUserById');
    const id = fake.uuid();
    findUserByIdSpy.mockResolvedValueOnce(null);
    await expect(sut.execute({ id })).rejects.toThrow(
      new Error('User not found')
    );
  });

  it('should return a user', async () => {
    const { sut } = makeSut();
    const id = fake.uuid();
    const user = await sut.execute({ id });
    expect(user).toEqual({
      id: user.id,
      name: user.name,
      nameAbbreviation: user.nameAbbreviation,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      password: undefined
    });
  });
});
