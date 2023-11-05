import { CreateUserUseCase } from '@/application/usecases/user/create/create-user.usecase';
import { CreateUserUseCaseInputDTO } from '@/application/usecases/user/create/create-user.usecase.dto';
import { Role } from '@/domain/role/entity/role';
import { FindRoleByIdRepository } from '@/domain/role/repository/find-role-by-id';
import { User } from '@/domain/user/entity/user';
import { Hasher } from '@/domain/user/gateway/hasher';
import { CreateUserRepository } from '@/domain/user/repository/create-use';
import { FindUserByNameAbbreviationRepository } from '@/domain/user/repository/find-user-by-abbreviation-name';
import { FindUserByEmailRepository } from '@/domain/user/repository/find-user-by-email';
import { describe, expect, it, vi } from 'vitest';
import { fake } from '../../../utils/fake-data-generator';

const makeFakeInput = (): CreateUserUseCaseInputDTO => ({
  name: fake.name(),
  email: fake.email(),
  nameAbbreviation: 'ABRV',
  password: '123456',
  passwordConfirmation: '123456',
  roleId: fake.uuid()
});

const makeFindRoleByIdRepository = () => ({
  findById: vi
    .fn()
    .mockResolvedValue(
      new Role({ id: 'default_fake_role_id', name: 'default_fake_role_name' })
    )
});

const makeFindUserByEmailRepository = () => ({
  findUserByEmail: vi.fn()
});

const makeFindUserByNameAbbreviationRepository = () => ({
  findByAbbreviationName: vi.fn()
});

const makeCreateUserRepository = () => ({
  create: vi.fn()
});

const makeHasher = () => ({
  hash: vi.fn().mockResolvedValue('hashed_password')
});

type SutType = {
  sut: CreateUserUseCase;
  findRoleByIdRepository: FindRoleByIdRepository;
  findUserByEmailRepository: FindUserByEmailRepository;
  findUserByNameAbbreviationRepository: FindUserByNameAbbreviationRepository;
  createUserRepository: CreateUserRepository;
  hasher: Hasher;
};

const makeSut = (): SutType => {
  const findRoleByIdRepository = makeFindRoleByIdRepository();
  const findUserByEmailRepository = makeFindUserByEmailRepository();
  const findUserByNameAbbreviationRepository =
    makeFindUserByNameAbbreviationRepository();
  const createUserRepository = makeCreateUserRepository();
  const hasher = makeHasher();

  const sut = new CreateUserUseCase(
    findRoleByIdRepository,
    findUserByEmailRepository,
    findUserByNameAbbreviationRepository,
    createUserRepository,
    hasher
  );

  return {
    sut,
    findRoleByIdRepository,
    findUserByEmailRepository,
    findUserByNameAbbreviationRepository,
    createUserRepository,
    hasher
  };
};

describe('CreateUserUseCase', () => {
  it('should call findRoleByIdRepository with correct param', async () => {
    const { sut, findRoleByIdRepository } = makeSut();
    const input = makeFakeInput();
    await sut.execute(input);
    expect(findRoleByIdRepository.findById).toHaveBeenCalledWith({
      id: input.roleId
    });
    expect(findRoleByIdRepository.findById).toHaveBeenCalledTimes(1);
  });

  it('should throw if findRoleByIdRepository returns null', async () => {
    const { sut, findRoleByIdRepository } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(findRoleByIdRepository, 'findById').mockResolvedValueOnce(null);
    await expect(sut.execute(input)).rejects.toThrow();
  });

  it('should throw if findRoleByIdRepository throws', async () => {
    const { sut, findRoleByIdRepository } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(findRoleByIdRepository, 'findById').mockRejectedValueOnce(
      new Error('any_error')
    );
    await expect(sut.execute(input)).rejects.toThrow(new Error('any_error'));
  });

  it('should call findUserByEmailRepository with correct param', async () => {
    const { sut, findUserByEmailRepository } = makeSut();
    const input = makeFakeInput();
    await sut.execute(input);
    expect(findUserByEmailRepository.findUserByEmail).toHaveBeenCalledWith({
      email: input.email
    });
    expect(findUserByEmailRepository.findUserByEmail).toHaveBeenCalledTimes(1);
  });

  it('should throw if findUserByEmailRepository throws', async () => {
    const { sut, findUserByEmailRepository } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(
      findUserByEmailRepository,
      'findUserByEmail'
    ).mockRejectedValueOnce(new Error('any_error'));
    await expect(sut.execute(input)).rejects.toThrow(new Error('any_error'));
  });

  it('should throw if findUserByEmailRepository returns a user', async () => {
    const { sut, findUserByEmailRepository } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(
      findUserByEmailRepository,
      'findUserByEmail'
    ).mockResolvedValueOnce(new User({ ...input, id: fake.uuid() }));
    await expect(sut.execute(input)).rejects.toThrow(
      `User with email ${input.email} already exists`
    );
  });

  it('should call findUserByNameAbbreviationRepository with correct param', async () => {
    const { sut, findUserByNameAbbreviationRepository } = makeSut();
    const input = makeFakeInput();
    await sut.execute(input);
    expect(
      findUserByNameAbbreviationRepository.findByAbbreviationName
    ).toHaveBeenCalledWith({
      abbreviationName: input.nameAbbreviation
    });
    expect(
      findUserByNameAbbreviationRepository.findByAbbreviationName
    ).toHaveBeenCalledTimes(1);
  });

  it('should throw if findUserByNameAbbreviationRepository throws', async () => {
    const { sut, findUserByNameAbbreviationRepository } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(
      findUserByNameAbbreviationRepository,
      'findByAbbreviationName'
    ).mockRejectedValueOnce(new Error('any_error'));
    await expect(sut.execute(input)).rejects.toThrow(new Error('any_error'));
  });

  it('should throw if findUserByNameAbbreviationRepository returns a user', async () => {
    const { sut, findUserByNameAbbreviationRepository } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(
      findUserByNameAbbreviationRepository,
      'findByAbbreviationName'
    ).mockResolvedValueOnce(new User({ ...input, id: fake.uuid() }));
    await expect(sut.execute(input)).rejects.toThrow(
      'User name abbreviation already registered'
    );
  });

  it('should throw if password and password confirmation differ', async () => {
    const { sut } = makeSut();
    const input = makeFakeInput();
    input.passwordConfirmation = '1234567';
    await expect(sut.execute(input)).rejects.toThrow(
      'Password and password confirmation differ'
    );
  });

  it('should call hasher with correct param', async () => {
    const { sut, hasher } = makeSut();
    const input = makeFakeInput();
    await sut.execute(input);
    expect(hasher.hash).toHaveBeenCalledWith(input.password);
    expect(hasher.hash).toHaveBeenCalledTimes(1);
  });

  it('should throw if hasher throws', async () => {
    const { sut, hasher } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(hasher, 'hash').mockRejectedValueOnce(new Error('any_error'));
    await expect(sut.execute(input)).rejects.toThrow(new Error('any_error'));
  });

  it('should call createUserRepository with correct param', async () => {
    const { sut, createUserRepository } = makeSut();
    const input = makeFakeInput();
    await sut.execute(input);
    expect(createUserRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: input.name,
        nameAbbreviation: input.nameAbbreviation,
        email: input.email,
        password: 'hashed_password',
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        role: expect.objectContaining({
          id: 'default_fake_role_id',
          name: 'default_fake_role_name'
        })
      })
    );
  });

  it('should throw if createUserRepository throws', async () => {
    const { sut, createUserRepository } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(createUserRepository, 'create').mockRejectedValueOnce(
      new Error('any_error')
    );
    await expect(sut.execute(input)).rejects.toThrow(new Error('any_error'));
  });

  it('should return a user', async () => {
    const { sut } = makeSut();
    const input = makeFakeInput();
    const user = await sut.execute(input);
    expect(user).toEqual({
      id: expect.any(String),
      name: input.name,
      nameAbbreviation: input.nameAbbreviation,
      email: input.email,
      roleId: input.roleId
    });
  });
});
