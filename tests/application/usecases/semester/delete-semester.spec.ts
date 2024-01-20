import { DeleteSemesterUseCase } from '@/application/usecases/semester/delete/delete-semester.usecase';
import { DeleteSemesterRepository } from '@/domain/semester/repository/delete-semester';
import { FindSemesterByIdRepository } from '@/domain/semester/repository/find-semester-by-id';
import { describe, expect, it, vi } from 'vitest';
import { makeFakeSemester } from '../../../@shared/fakes';
import { fake } from '../../../utils/fake-data-generator';

const semesterId = fake.uuid();

const makeFindSemesterByIdRepositoryStub = (): FindSemesterByIdRepository => ({
  findById: vi.fn().mockResolvedValue(makeFakeSemester({ id: semesterId }))
});

const makeDeleteSemesterRepositoryStub = (): DeleteSemesterRepository => ({
  delete: vi.fn()
});

type SutTypes = {
  sut: DeleteSemesterUseCase;
  findSemesterByIdRepositoryMock: FindSemesterByIdRepository;
  deleteSemesterRepositoryMock: DeleteSemesterRepository;
};

const makeSut = (): SutTypes => {
  const findSemesterByIdRepositoryMock = makeFindSemesterByIdRepositoryStub();
  const deleteSemesterRepositoryMock = makeDeleteSemesterRepositoryStub();
  const sut = new DeleteSemesterUseCase(
    findSemesterByIdRepositoryMock,
    deleteSemesterRepositoryMock
  );

  return {
    sut,
    findSemesterByIdRepositoryMock,
    deleteSemesterRepositoryMock
  };
};

describe('DeleteSemesterUseCase', () => {
  it('should call FindSemesterByIdRepository with correct params', async () => {
    const { sut, findSemesterByIdRepositoryMock } = makeSut();
    await sut.execute({ id: semesterId });
    expect(findSemesterByIdRepositoryMock.findById).toHaveBeenCalledWith(
      semesterId
    );
  });

  it('should throw if FindSemesterByIdRepository throws', async () => {
    const { sut, findSemesterByIdRepositoryMock } = makeSut();
    vi.spyOn(findSemesterByIdRepositoryMock, 'findById').mockRejectedValue(
      new Error('any_repo_error')
    );
    await expect(sut.execute({ id: semesterId })).rejects.toThrow(
      'any_repo_error'
    );
  });

  it('should throw if FindSemesterByIdRepository returns null', async () => {
    const { sut, findSemesterByIdRepositoryMock } = makeSut();
    vi.spyOn(findSemesterByIdRepositoryMock, 'findById').mockResolvedValue(
      null
    );
    await expect(sut.execute({ id: semesterId })).rejects.toThrow(
      `Semester with id ${semesterId} not found`
    );
  });

  it('should call DeleteSemesterRepository with correct params', async () => {
    const { sut, deleteSemesterRepositoryMock } = makeSut();
    await sut.execute({ id: semesterId });
    expect(deleteSemesterRepositoryMock.delete).toHaveBeenCalledWith(
      semesterId
    );
  });

  it('should throw if DeleteSemesterRepository throws', async () => {
    const { sut, deleteSemesterRepositoryMock } = makeSut();
    vi.spyOn(deleteSemesterRepositoryMock, 'delete').mockRejectedValue(
      new Error('any_repo_error')
    );
    await expect(sut.execute({ id: semesterId })).rejects.toThrow(
      'any_repo_error'
    );
  });

  it('should return undefined if everything succeeds', async () => {
    const { sut } = makeSut();
    const result = await sut.execute({ id: semesterId });
    expect(result).toBeUndefined();
  });
});
