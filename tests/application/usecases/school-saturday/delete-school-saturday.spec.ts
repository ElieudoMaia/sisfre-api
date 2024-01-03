import { DeleteSchoolSaturdayUseCase } from '@/application/usecases/school-saturday/delete/delete-school-saturday.usecase';
import { DeleteSchoolSaturdayRepository } from '@/domain/school-saturday/repository/delete-school-saturday';
import { FindSchoolSaturdayByIdRepository } from '@/domain/school-saturday/repository/find-school-saturday-by-id';
import { describe, expect, it, vi } from 'vitest';
import { makeFakeSchoolSaturday } from '../../../@shared/fakes';
import { fake } from '../../../utils/fake-data-generator';

const schoolSaturdayId = fake.uuid();

const makeFindSchoolSaturdayByIdRepositoryStub =
  (): FindSchoolSaturdayByIdRepository => ({
    findById: vi
      .fn()
      .mockResolvedValue(makeFakeSchoolSaturday({ id: schoolSaturdayId }))
  });

const makeDeleteSchoolSaturdayRepositoryStub =
  (): DeleteSchoolSaturdayRepository => ({
    delete: vi.fn()
  });

type SutTypes = {
  sut: DeleteSchoolSaturdayUseCase;
  findSchoolSaturdayByIdRepositoryMock: FindSchoolSaturdayByIdRepository;
  deleteSchoolSaturdayRepositoryMock: DeleteSchoolSaturdayRepository;
};

const makeSut = (): SutTypes => {
  const findSchoolSaturdayByIdRepositoryMock =
    makeFindSchoolSaturdayByIdRepositoryStub();
  const deleteSchoolSaturdayRepositoryMock =
    makeDeleteSchoolSaturdayRepositoryStub();
  const sut = new DeleteSchoolSaturdayUseCase(
    findSchoolSaturdayByIdRepositoryMock,
    deleteSchoolSaturdayRepositoryMock
  );

  return {
    sut,
    findSchoolSaturdayByIdRepositoryMock,
    deleteSchoolSaturdayRepositoryMock
  };
};

describe('DeleteSchoolSaturdayUseCase', () => {
  it('should call FindSchoolSaturdayByIdRepository with correct params', async () => {
    const { sut, findSchoolSaturdayByIdRepositoryMock } = makeSut();
    await sut.execute({ id: schoolSaturdayId });
    expect(findSchoolSaturdayByIdRepositoryMock.findById).toHaveBeenCalledWith(
      schoolSaturdayId
    );
  });

  it('should throw if FindSchoolSaturdayByIdRepository throws', async () => {
    const { sut, findSchoolSaturdayByIdRepositoryMock } = makeSut();
    vi.spyOn(
      findSchoolSaturdayByIdRepositoryMock,
      'findById'
    ).mockRejectedValue(new Error('any_repo_error'));
    await expect(sut.execute({ id: schoolSaturdayId })).rejects.toThrow(
      'any_repo_error'
    );
  });

  it('should throw if FindSchoolSaturdayByIdRepository returns null', async () => {
    const { sut, findSchoolSaturdayByIdRepositoryMock } = makeSut();
    vi.spyOn(
      findSchoolSaturdayByIdRepositoryMock,
      'findById'
    ).mockResolvedValue(null);
    await expect(sut.execute({ id: schoolSaturdayId })).rejects.toThrow(
      `School Saturday with id ${schoolSaturdayId} not found`
    );
  });

  it('should call DeleteSchoolSaturdayRepository with correct params', async () => {
    const { sut, deleteSchoolSaturdayRepositoryMock } = makeSut();
    await sut.execute({ id: schoolSaturdayId });
    expect(deleteSchoolSaturdayRepositoryMock.delete).toHaveBeenCalledWith(
      schoolSaturdayId
    );
  });

  it('should throw if DeleteSchoolSaturdayRepository throws', async () => {
    const { sut, deleteSchoolSaturdayRepositoryMock } = makeSut();
    vi.spyOn(deleteSchoolSaturdayRepositoryMock, 'delete').mockRejectedValue(
      new Error('any_repo_error')
    );
    await expect(sut.execute({ id: schoolSaturdayId })).rejects.toThrow(
      'any_repo_error'
    );
  });

  it('should return undefined if everything succeeds', async () => {
    const { sut } = makeSut();
    const result = await sut.execute({ id: schoolSaturdayId });
    expect(result).toBeUndefined();
  });
});
