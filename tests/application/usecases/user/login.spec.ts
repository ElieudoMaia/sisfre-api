import { LoginUseCase } from '@/application/usecases/user/login/login.usecase';
import { LoginUseCaseInputDTO } from '@/application/usecases/user/login/login.usecase.dto';
import { IncorrectPasswordError } from '@/domain/user/errors/incorrect-password.error';
import { UserNotFoundError } from '@/domain/user/errors/user-not-found.error';
import { AccessTokenGenerator } from '@/domain/user/gateway/access-token-generator';
import { HashComparer } from '@/domain/user/gateway/hash-comparer';
import { FindUserByEmailRepository } from '@/domain/user/repository/find-user-by-email';
import { describe, expect, it, vi } from 'vitest';
import { fake } from '../../../utils/fake-data-generator';

const fakeUser = {
  id: fake.uuid(),
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_hashed_password',
  createdAt: new Date(),
  updatedAt: new Date()
};

const fakeToken = fake.jwtToken();

const makeFindUserByEmailRepository = () => {
  return {
    findUserByEmail: vi.fn().mockResolvedValue(fakeUser)
  };
};

const makeHashComarerRepository = () => {
  return {
    compare: vi.fn().mockResolvedValue(true)
  };
};

const makeAccessTokenGeneratorRepository = () => {
  return {
    generate: vi.fn().mockResolvedValue(fakeToken)
  };
};

interface SutType {
  sut: LoginUseCase;
  findUserByEmailRepository: FindUserByEmailRepository;
  hashComparer: HashComparer;
  accessTokenGenerator: AccessTokenGenerator;
}

const makeSut = (): SutType => {
  const findUserByEmailRepository = makeFindUserByEmailRepository();
  const hashComparer = makeHashComarerRepository();
  const accessTokenGenerator = makeAccessTokenGeneratorRepository();

  const sut = new LoginUseCase(
    findUserByEmailRepository,
    hashComparer,
    accessTokenGenerator
  );

  return {
    sut,
    findUserByEmailRepository,
    hashComparer,
    accessTokenGenerator
  };
};

const makeFakeInput = (): LoginUseCaseInputDTO => ({
  email: fakeUser.email,
  password: fake.password()
});

describe('Login', () => {
  it('should call findUserByEmail with correct param', async () => {
    const { sut, findUserByEmailRepository } = makeSut();
    const fakeData = makeFakeInput();
    await sut.execute(fakeData);
    expect(findUserByEmailRepository.findUserByEmail).toHaveBeenCalledWith({
      email: fakeData.email
    });
    expect(findUserByEmailRepository.findUserByEmail).toHaveBeenCalledTimes(1);
  });

  it('should throw if findUserByEmail throws', async () => {
    const { sut, findUserByEmailRepository } = makeSut();
    vi.spyOn(
      findUserByEmailRepository,
      'findUserByEmail'
    ).mockRejectedValueOnce(new Error('any_error'));
    const promise = sut.execute(makeFakeInput());
    await expect(promise).rejects.toThrow(new Error('any_error'));
  });

  it('should throw if user was not found', async () => {
    const { sut, findUserByEmailRepository } = makeSut();
    vi.spyOn(
      findUserByEmailRepository,
      'findUserByEmail'
    ).mockResolvedValueOnce(null);
    const promise = sut.execute(makeFakeInput());
    await expect(promise).rejects.toThrow(
      new UserNotFoundError('user not found')
    );
  });

  it('should call hashComparer with correct params', async () => {
    const { sut, hashComparer } = makeSut();
    const fakeData = makeFakeInput();
    await sut.execute(fakeData);
    expect(hashComparer.compare).toHaveBeenCalledWith(
      fakeData.password,
      'any_hashed_password'
    );
  });

  it('should throw if hashComparer throws', async () => {
    const { sut, hashComparer } = makeSut();
    vi.spyOn(hashComparer, 'compare').mockRejectedValueOnce(
      new Error('fake_error')
    );
    const promise = sut.execute(makeFakeInput());
    await expect(promise).rejects.toThrow('fake_error');
  });

  it('should throw if the password does not match', async () => {
    const { sut, hashComparer } = makeSut();
    vi.spyOn(hashComparer, 'compare').mockResolvedValueOnce(false);
    const promise = sut.execute(makeFakeInput());
    await expect(promise).rejects.toThrow(IncorrectPasswordError);
  });

  it('should call accessTokenGenerator with correct params', async () => {
    const { sut, accessTokenGenerator } = makeSut();
    const fakeData = makeFakeInput();
    await sut.execute(fakeData);
    expect(accessTokenGenerator.generate).toHaveBeenCalledWith({
      id: fakeUser.id,
      name: fakeUser.name,
      email: fakeData.email
    });
    expect(accessTokenGenerator.generate).toHaveBeenCalledTimes(1);
  });

  it('should throw if accessTokenGenerator throws', async () => {
    const { sut, accessTokenGenerator } = makeSut();
    vi.spyOn(accessTokenGenerator, 'generate').mockRejectedValueOnce(
      new Error('fake_error')
    );
    const promise = sut.execute(makeFakeInput());
    await expect(promise).rejects.toThrow('fake_error');
  });

  it('should return the generated accessToken on success', async () => {
    const { sut } = makeSut();
    const fakeData = makeFakeInput();
    const result = await sut.execute(fakeData);
    expect(result.accessToken).toBe(fakeToken);
  });
});
