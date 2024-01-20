import { FindSemesterByIdUseCase } from '@/application/usecases/semester/find-by-id/find-semester-by-id.usecase';
import { FindSemesterByIdRepository } from '@/domain/semester/repository/find-semester-by-id';
import { describe, expect, it, vi } from 'vitest';
import { makeFakeSemester } from '../../../@shared/fakes';
import { fake } from '../../../utils/fake-data-generator';

const makeFindSemesterByIdRepository = (): FindSemesterByIdRepository => ({
  findById: vi.fn().mockResolvedValue(makeFakeSemester())
});

type SutType = {
  sut: FindSemesterByIdUseCase;
  findSemesterByIdRepository: FindSemesterByIdRepository;
};

const makeSut = (): SutType => {
  const findSemesterByIdRepository = makeFindSemesterByIdRepository();
  const sut = new FindSemesterByIdUseCase(findSemesterByIdRepository);
  return {
    findSemesterByIdRepository,
    sut
  };
};

describe('FindSemesterByIdUseCase', () => {
  it('should call FindSemesterByIdRepository with correct params', async () => {
    const { sut, findSemesterByIdRepository } = makeSut();
    const findSemesterByIdSpy = findSemesterByIdRepository.findById;
    const id = fake.uuid();
    await sut.execute({ id });
    expect(findSemesterByIdSpy).toHaveBeenCalledWith(id);
  });

  it('should throw if FindSemesterByIdRepository throws', async () => {
    const { sut, findSemesterByIdRepository } = makeSut();
    const findSemesterByIdSpy = vi.spyOn(
      findSemesterByIdRepository,
      'findById'
    );
    const id = fake.uuid();
    findSemesterByIdSpy.mockRejectedValueOnce(new Error('mock'));
    await expect(sut.execute({ id })).rejects.toThrow(new Error('mock'));
  });

  it('should throw if FindSemesterByIdRepository returns null', async () => {
    const { sut, findSemesterByIdRepository } = makeSut();
    const findUserByIdSpy = vi.spyOn(findSemesterByIdRepository, 'findById');
    const id = fake.uuid();
    findUserByIdSpy.mockResolvedValueOnce(null);
    await expect(sut.execute({ id })).rejects.toThrow(
      new Error('semester not found')
    );
  });

  it('should return data on success', async () => {
    const { sut } = makeSut();
    const id = fake.uuid();
    const semester = await sut.execute({ id });
    expect(semester).toEqual({
      id: semester.id,
      year: semester.year,
      semester: semester.semester,
      startFirstStage: semester.startFirstStage,
      endFirstStage: semester.endFirstStage,
      startSecondStage: semester.startSecondStage,
      endSecondStage: semester.endSecondStage,
      type: semester.type,
      createdAt: semester.createdAt,
      updatedAt: semester.updatedAt
    });
  });
});
