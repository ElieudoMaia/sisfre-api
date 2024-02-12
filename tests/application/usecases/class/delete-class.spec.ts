import { DeleteClassUseCase } from '@/application/usecases/class/delete/delete-class.usecase';
import { DeleteClassRepository } from '@/domain/class/repository/delete-class';
import { FindClassByIdRepository } from '@/domain/class/repository/find-class-by-id';
import { describe, expect, it, vi } from 'vitest';
import { makeFakeClass } from '../../../@shared/fakes';
import { fake } from '../../../utils/fake-data-generator';

const classId = fake.uuid();

const makeFindClassByIdRepositoryStub = (): FindClassByIdRepository => ({
  findById: vi.fn().mockResolvedValue(makeFakeClass({ id: classId }))
});

const makeDeleteClassRepositoryStub = (): DeleteClassRepository => ({
  delete: vi.fn()
});

type SutTypes = {
  sut: DeleteClassUseCase;
  findClassByIdRepositoryMock: FindClassByIdRepository;
  deleteClassRepositoryMock: DeleteClassRepository;
};

const makeSut = (): SutTypes => {
  const findClassByIdRepositoryMock = makeFindClassByIdRepositoryStub();
  const deleteClassRepositoryMock = makeDeleteClassRepositoryStub();
  const sut = new DeleteClassUseCase(
    findClassByIdRepositoryMock,
    deleteClassRepositoryMock
  );

  return {
    sut,
    findClassByIdRepositoryMock,
    deleteClassRepositoryMock
  };
};

describe('DeleteClassUseCase', () => {
  it('should call FindClassByIdRepository with correct params', async () => {
    const { sut, findClassByIdRepositoryMock } = makeSut();
    await sut.execute({ id: classId });
    expect(findClassByIdRepositoryMock.findById).toHaveBeenCalledWith(classId);
  });

  it('should throw if FindClassByIdRepository throws', async () => {
    const { sut, findClassByIdRepositoryMock } = makeSut();
    vi.spyOn(findClassByIdRepositoryMock, 'findById').mockRejectedValue(
      new Error('any_repo_error')
    );
    await expect(sut.execute({ id: classId })).rejects.toThrow(
      'any_repo_error'
    );
  });

  it('should throw if FindClassByIdRepository returns null', async () => {
    const { sut, findClassByIdRepositoryMock } = makeSut();
    vi.spyOn(findClassByIdRepositoryMock, 'findById').mockResolvedValue(null);
    await expect(sut.execute({ id: classId })).rejects.toThrow(
      `class with id ${classId} not found`
    );
  });

  it('should call DeleteClassRepository with correct params', async () => {
    const { sut, deleteClassRepositoryMock } = makeSut();
    await sut.execute({ id: classId });
    expect(deleteClassRepositoryMock.delete).toHaveBeenCalledWith(classId);
  });

  it('should throw if DeleteClassRepository throws', async () => {
    const { sut, deleteClassRepositoryMock } = makeSut();
    vi.spyOn(deleteClassRepositoryMock, 'delete').mockRejectedValue(
      new Error('any_repo_error')
    );
    await expect(sut.execute({ id: classId })).rejects.toThrow(
      'any_repo_error'
    );
  });

  it('should return undefined if everything succeeds', async () => {
    const { sut } = makeSut();
    const result = await sut.execute({ id: classId });
    expect(result).toBeUndefined();
  });
});
