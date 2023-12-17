import { FindSchoolSaturdayByIdUseCase } from '@/application/usecases/school-saturday/find-by-id/find-school-saturday-by-id.usecase';
import { FindSchoolSaturdayByIdRepository } from '@/domain/school-saturday/repository/find-school-saturday-by-id';
import { describe, expect, it, vi } from 'vitest';
import { makeFakeSchoolSaturday } from '../../../@shared/fakes';
import { fake } from '../../../utils/fake-data-generator';

const makeFindSchoolSaturdayByIdRepository =
  (): FindSchoolSaturdayByIdRepository => ({
    findById: vi.fn().mockResolvedValue(makeFakeSchoolSaturday())
  });

type SutType = {
  sut: FindSchoolSaturdayByIdUseCase;
  findSchoolSaturdayByIdRepository: FindSchoolSaturdayByIdRepository;
};

const makeSut = (): SutType => {
  const findSchoolSaturdayByIdRepository =
    makeFindSchoolSaturdayByIdRepository();
  const sut = new FindSchoolSaturdayByIdUseCase(
    findSchoolSaturdayByIdRepository
  );
  return {
    findSchoolSaturdayByIdRepository,
    sut
  };
};

describe('FindSchoolSaturdayByIdUseCase', () => {
  it('should call FindSchoolSaturdayByIdRepository with correct params', async () => {
    const { sut, findSchoolSaturdayByIdRepository } = makeSut();
    const findSchoolSaturdayByIdSpy = findSchoolSaturdayByIdRepository.findById;
    const id = fake.uuid();
    await sut.execute({ id });
    expect(findSchoolSaturdayByIdSpy).toHaveBeenCalledWith(id);
  });

  it('should throw if FindSchoolSaturdayByIdRepository throws', async () => {
    const { sut, findSchoolSaturdayByIdRepository } = makeSut();
    const findSchoolSaturdayByIdSpy = vi.spyOn(
      findSchoolSaturdayByIdRepository,
      'findById'
    );
    const id = fake.uuid();
    findSchoolSaturdayByIdSpy.mockRejectedValueOnce(new Error('mock'));
    await expect(sut.execute({ id })).rejects.toThrow(new Error('mock'));
  });

  it('should throw if FindSchoolSaturdayByIdRepository returns null', async () => {
    const { sut, findSchoolSaturdayByIdRepository } = makeSut();
    const findUserByIdSpy = vi.spyOn(
      findSchoolSaturdayByIdRepository,
      'findById'
    );
    const id = fake.uuid();
    findUserByIdSpy.mockResolvedValueOnce(null);
    await expect(sut.execute({ id })).rejects.toThrow(
      new Error('school saturday not found')
    );
  });

  it('should return data on success', async () => {
    const { sut } = makeSut();
    const id = fake.uuid();
    const schoolSaturday = await sut.execute({ id });
    expect(schoolSaturday).toEqual({
      id: schoolSaturday.id,
      referringTo: schoolSaturday.referringTo,
      date: schoolSaturday.date,
      createdAt: schoolSaturday.createdAt,
      updatedAt: schoolSaturday.updatedAt,
      password: undefined
    });
  });
});
