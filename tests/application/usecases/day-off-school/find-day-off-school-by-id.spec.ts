import { FindDayOffSchoolByIdUseCase } from '@/application/usecases/day-off-school/find-by-id/find-day-off-school-by-id.usecase';
import { FindDayOffSchoolByIdRepository } from '@/domain/day-off-school/repository/find-day-off-school-by-id-repository';
import { describe, expect, it, vi } from 'vitest';
import { makeFakeDayOffSchool } from '../../../@shared/fakes';
import { fake } from '../../../utils/fake-data-generator';

const makeFindDayOffSchoolByIdRepository =
  (): FindDayOffSchoolByIdRepository => ({
    findById: vi.fn().mockResolvedValue(makeFakeDayOffSchool())
  });

type SutType = {
  sut: FindDayOffSchoolByIdUseCase;
  findDayOffSchoolByIdRepository: FindDayOffSchoolByIdRepository;
};

const makeSut = (): SutType => {
  const findDayOffSchoolByIdRepository = makeFindDayOffSchoolByIdRepository();
  const sut = new FindDayOffSchoolByIdUseCase(findDayOffSchoolByIdRepository);
  return {
    sut,
    findDayOffSchoolByIdRepository
  };
};

describe('FindDayOffSchoolByIdUseCase', () => {
  it('should call FindDayOffSchoolByIdRepository with correct params', async () => {
    const { sut, findDayOffSchoolByIdRepository } = makeSut();
    const findDayOffSchoolByIdSpy = findDayOffSchoolByIdRepository.findById;
    const id = fake.uuid();
    await sut.execute({ id });
    expect(findDayOffSchoolByIdSpy).toHaveBeenCalledWith(id);
  });

  it('should throw if FindDayOffSchoolByIdRepository throws', async () => {
    const { sut, findDayOffSchoolByIdRepository } = makeSut();
    const findDayOffSchoolByIdSpy = vi.spyOn(
      findDayOffSchoolByIdRepository,
      'findById'
    );
    const id = fake.uuid();
    findDayOffSchoolByIdSpy.mockRejectedValueOnce(new Error('mock'));
    await expect(sut.execute({ id })).rejects.toThrow(new Error('mock'));
  });

  it('should throw if FindDayOffSchoolByIdRepository returns null', async () => {
    const { sut, findDayOffSchoolByIdRepository } = makeSut();
    const findUserByIdSpy = vi.spyOn(
      findDayOffSchoolByIdRepository,
      'findById'
    );
    const id = fake.uuid();
    findUserByIdSpy.mockResolvedValueOnce(null);
    await expect(sut.execute({ id })).rejects.toThrow(
      new Error('day off school not found')
    );
  });

  it('should return data on success', async () => {
    const { sut } = makeSut();
    const id = fake.uuid();
    const dayOffSchool = await sut.execute({ id });
    expect(dayOffSchool).toEqual({
      id: dayOffSchool.id,
      description: dayOffSchool.description,
      type: dayOffSchool.type,
      dateBegin: dayOffSchool.dateBegin,
      dateEnd: dayOffSchool.dateEnd,
      createdAt: dayOffSchool.createdAt,
      updatedAt: dayOffSchool.updatedAt
    });
  });
});
