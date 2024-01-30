import { DeleteDayOffSchoolUseCase } from '@/application/usecases/day-off-school/delete/delete-day-off-school.usecase';
import { DeleteDayOffSchoolRepository } from '@/domain/day-off-school/repository/delete-day-off-school';
import { FindDayOffSchoolByIdRepository } from '@/domain/day-off-school/repository/find-day-off-school-by-id-repository';
import { describe, expect, it, vi } from 'vitest';
import { makeFakeDayOffSchool } from '../../../@shared/fakes';
import { fake } from '../../../utils/fake-data-generator';

const dayOffSchoolId = fake.uuid();

const makeFindDayOffSchoolByIdRepositoryStub =
  (): FindDayOffSchoolByIdRepository => ({
    findById: vi
      .fn()
      .mockResolvedValue(makeFakeDayOffSchool({ id: dayOffSchoolId }))
  });

const makeDeleteDayOffSchoolRepositoryStub =
  (): DeleteDayOffSchoolRepository => ({
    delete: vi.fn()
  });

type SutTypes = {
  sut: DeleteDayOffSchoolUseCase;
  findDayOffSchoolByIdRepositoryMock: FindDayOffSchoolByIdRepository;
  deleteDayOffSchoolRepositoryMock: DeleteDayOffSchoolRepository;
};

const makeSut = (): SutTypes => {
  const findDayOffSchoolByIdRepositoryMock =
    makeFindDayOffSchoolByIdRepositoryStub();
  const deleteDayOffSchoolRepositoryMock =
    makeDeleteDayOffSchoolRepositoryStub();
  const sut = new DeleteDayOffSchoolUseCase(
    findDayOffSchoolByIdRepositoryMock,
    deleteDayOffSchoolRepositoryMock
  );

  return {
    sut,
    findDayOffSchoolByIdRepositoryMock,
    deleteDayOffSchoolRepositoryMock
  };
};

describe('DeleteDayOffSchoolUseCase', () => {
  it('should call FindDayOffSchoolByIdRepository with correct params', async () => {
    const { sut, findDayOffSchoolByIdRepositoryMock } = makeSut();
    await sut.execute({ id: dayOffSchoolId });
    expect(findDayOffSchoolByIdRepositoryMock.findById).toHaveBeenCalledWith(
      dayOffSchoolId
    );
  });

  it('should throw if FindDayOffSchoolByIdRepository throws', async () => {
    const { sut, findDayOffSchoolByIdRepositoryMock } = makeSut();
    vi.spyOn(findDayOffSchoolByIdRepositoryMock, 'findById').mockRejectedValue(
      new Error('any_repo_error')
    );
    await expect(sut.execute({ id: dayOffSchoolId })).rejects.toThrow(
      'any_repo_error'
    );
  });

  it('should throw if FindDayOffSchoolByIdRepository returns null', async () => {
    const { sut, findDayOffSchoolByIdRepositoryMock } = makeSut();
    vi.spyOn(findDayOffSchoolByIdRepositoryMock, 'findById').mockResolvedValue(
      null
    );
    await expect(sut.execute({ id: dayOffSchoolId })).rejects.toThrow(
      `day off school with id ${dayOffSchoolId} not found`
    );
  });

  it('should call DeleteDayOffSchoolRepository with correct params', async () => {
    const { sut, deleteDayOffSchoolRepositoryMock } = makeSut();
    await sut.execute({ id: dayOffSchoolId });
    expect(deleteDayOffSchoolRepositoryMock.delete).toHaveBeenCalledWith(
      dayOffSchoolId
    );
  });

  it('should throw if DeleteDayOffSchoolRepository throws', async () => {
    const { sut, deleteDayOffSchoolRepositoryMock } = makeSut();
    vi.spyOn(deleteDayOffSchoolRepositoryMock, 'delete').mockRejectedValue(
      new Error('any_repo_error')
    );
    await expect(sut.execute({ id: dayOffSchoolId })).rejects.toThrow(
      'any_repo_error'
    );
  });

  it('should return undefined if everything succeeds', async () => {
    const { sut } = makeSut();
    const result = await sut.execute({ id: dayOffSchoolId });
    expect(result).toBeUndefined();
  });
});
