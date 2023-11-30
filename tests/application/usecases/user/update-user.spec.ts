import { UpdateUserUseCase } from '@/application/usecases/user/update/update-user.usecase';
import { UpdateUserUseCaseInputDTO } from '@/application/usecases/user/update/update-user.usecase.dto';
import { User, UserRole } from '@/domain/user/entity/user';
import { FindUserByNameAbbreviationRepository } from '@/domain/user/repository/find-user-by-abbreviation-name';
import { FindUserByEmailRepository } from '@/domain/user/repository/find-user-by-email';
import { FindUserByIdRepository } from '@/domain/user/repository/find-user-by-id';
import { UpdateUserRepository } from '@/domain/user/repository/update-user';
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

const makeFindUserByIdRepository = (): FindUserByIdRepository => ({
  findUserById: vi.fn().mockResolvedValue(makeFakeUser())
});

const makeFindUserByEmailRepository = (): FindUserByEmailRepository => ({
  findUserByEmail: vi.fn().mockResolvedValue(null)
});

const makeFindUserByNameAbbreviationRepository =
  (): FindUserByNameAbbreviationRepository => ({
    findByAbbreviationName: vi.fn().mockResolvedValue(null)
  });

const makeUpdateUserRepository = (): UpdateUserRepository => ({
  updateUser: vi.fn()
});

type SutTypes = {
  sut: UpdateUserUseCase;
  findUserByIdRepositoryMock: FindUserByIdRepository;
  findUserByEmailRepositoryMock: FindUserByEmailRepository;
  findUserByNameAbbreviationRepositoryMock: FindUserByNameAbbreviationRepository;
  updateUserRepositoryMock: UpdateUserRepository;
};

const makeSut = (): SutTypes => {
  const findUserByIdRepositoryMock = makeFindUserByIdRepository();
  const findUserByEmailRepositoryMock = makeFindUserByEmailRepository();
  const findUserByNameAbbreviationRepositoryMock =
    makeFindUserByNameAbbreviationRepository();
  const updateUserRepositoryMock = makeUpdateUserRepository();
  const sut = new UpdateUserUseCase(
    findUserByIdRepositoryMock,
    findUserByEmailRepositoryMock,
    findUserByNameAbbreviationRepositoryMock,
    updateUserRepositoryMock
  );

  return {
    sut,
    findUserByIdRepositoryMock,
    findUserByEmailRepositoryMock,
    findUserByNameAbbreviationRepositoryMock,
    updateUserRepositoryMock
  };
};

const makeFakeInput = (): UpdateUserUseCaseInputDTO => ({
  id: 'any_id',
  name: 'any_name',
  nameAbbreviation: 'any_name_abbreviation',
  email: 'any_email',
  role: 'ADMINISTRATOR'
});

describe('UpdateUserUseCase', () => {
  it('should call FindUserByIdRepository with correct params', async () => {
    const { sut, findUserByIdRepositoryMock } = makeSut();
    const findUserByIdSpy = vi.spyOn(
      findUserByIdRepositoryMock,
      'findUserById'
    );
    await sut.execute(makeFakeInput());
    expect(findUserByIdSpy).toHaveBeenCalledWith('any_id');
  });

  it('should throw if FindUserByIdRepository throws', async () => {
    const { sut, findUserByIdRepositoryMock } = makeSut();
    vi.spyOn(findUserByIdRepositoryMock, 'findUserById').mockRejectedValueOnce(
      new Error()
    );
    const promise = sut.execute(makeFakeInput());
    await expect(promise).rejects.toThrow();
  });

  it('should throw if FindUserByIdRepository returns null', async () => {
    const { sut, findUserByIdRepositoryMock } = makeSut();
    vi.spyOn(findUserByIdRepositoryMock, 'findUserById').mockResolvedValueOnce(
      null
    );
    const promise = sut.execute(makeFakeInput());
    await expect(promise).rejects.toThrow();
  });

  it('should call FindUserByEmailRepository with correct params', async () => {
    const { sut, findUserByEmailRepositoryMock } = makeSut();
    const findUserByEmailSpy = vi.spyOn(
      findUserByEmailRepositoryMock,
      'findUserByEmail'
    );
    await sut.execute(makeFakeInput());
    expect(findUserByEmailSpy).toHaveBeenCalledWith({ email: 'any_email' });
  });

  it('should throw if FindUserByEmailRepository throws', async () => {
    const { sut, findUserByEmailRepositoryMock } = makeSut();
    vi.spyOn(
      findUserByEmailRepositoryMock,
      'findUserByEmail'
    ).mockRejectedValueOnce(new Error());
    const promise = sut.execute(makeFakeInput());
    await expect(promise).rejects.toThrow();
  });

  it('should throw if FindUserByEmailRepository returns a user', async () => {
    const { sut, findUserByEmailRepositoryMock } = makeSut();
    const fakeUser = makeFakeUser();
    vi.spyOn(
      findUserByEmailRepositoryMock,
      'findUserByEmail'
    ).mockResolvedValueOnce(fakeUser);
    const promise = sut.execute(makeFakeInput());
    await expect(promise).rejects.toThrow(
      `User with email ${fakeUser.email} already exists`
    );
  });

  it('should call FindUserByNameAbbreviationRepository with correct params', async () => {
    const { sut, findUserByNameAbbreviationRepositoryMock } = makeSut();
    const findUserByNameAbbreviationSpy = vi.spyOn(
      findUserByNameAbbreviationRepositoryMock,
      'findByAbbreviationName'
    );
    await sut.execute(makeFakeInput());
    expect(findUserByNameAbbreviationSpy).toHaveBeenCalledWith({
      abbreviationName: 'any_name_abbreviation'
    });
  });

  it('should throw if FindUserByNameAbbreviationRepository throws', async () => {
    const { sut, findUserByNameAbbreviationRepositoryMock } = makeSut();
    vi.spyOn(
      findUserByNameAbbreviationRepositoryMock,
      'findByAbbreviationName'
    ).mockRejectedValueOnce(new Error(' fake error'));
    const promise = sut.execute(makeFakeInput());
    await expect(promise).rejects.toThrow('fake error');
  });

  it('should throw if FindUserByNameAbbreviationRepository returns a user', async () => {
    const { sut, findUserByNameAbbreviationRepositoryMock } = makeSut();
    const fakeUser = makeFakeUser();
    vi.spyOn(
      findUserByNameAbbreviationRepositoryMock,
      'findByAbbreviationName'
    ).mockResolvedValueOnce(fakeUser);
    const promise = sut.execute(makeFakeInput());
    await expect(promise).rejects.toThrow(
      'User name abbreviation already registered'
    );
  });

  it('should call UpdateUserRepository with correct params', async () => {
    const { sut, updateUserRepositoryMock } = makeSut();
    const updateUserSpy = vi.spyOn(updateUserRepositoryMock, 'updateUser');
    await sut.execute(makeFakeInput());
    expect(updateUserSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(String),
        name: 'any_name',
        nameAbbreviation: 'any_name_abbreviation',
        email: 'any_email',
        role: 'ADMINISTRATOR'
      })
    );
  });

  it('should throw if UpdateUserRepository throws', async () => {
    const { sut, updateUserRepositoryMock } = makeSut();
    vi.spyOn(updateUserRepositoryMock, 'updateUser').mockRejectedValueOnce(
      new Error('update error')
    );
    const promise = sut.execute(makeFakeInput());
    await expect(promise).rejects.toThrow('update error');
  });

  it('should return corret data on success', async () => {
    const { sut } = makeSut();
    const result = await sut.execute(makeFakeInput());
    expect(result).toEqual({
      id: expect.any(String),
      name: 'any_name',
      nameAbbreviation: 'any_name_abbreviation',
      email: 'any_email',
      role: 'ADMINISTRATOR'
    });
  });
});
