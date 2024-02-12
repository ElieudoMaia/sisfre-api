import { FindClassByIdUseCase } from '@/application/usecases/class/find-by-id/find-class-by-id.usecase';
import { NotFoundError } from '@/domain/@shared/error/not-found.error';
import { FindClassByIdRepository } from '@/domain/class/repository/find-class-by-id';
import { describe, expect, it, vi } from 'vitest';
import { makeFakeClass } from '../../../@shared/fakes';
import { fake } from '../../../utils/fake-data-generator';

const makeFindClassByIdRepository = (): FindClassByIdRepository => ({
  findById: vi.fn().mockResolvedValue(makeFakeClass())
});

type SutType = {
  sut: FindClassByIdUseCase;
  findClassByIdRepository: FindClassByIdRepository;
};

const makeSut = (): SutType => {
  const findClassByIdRepository = makeFindClassByIdRepository();
  const sut = new FindClassByIdUseCase(findClassByIdRepository);
  return {
    sut,
    findClassByIdRepository
  };
};

describe('FindClassByIdUseCase', () => {
  it('should call FindClassByIdRepository with correct params', async () => {
    const { sut, findClassByIdRepository } = makeSut();
    const findClassByIdSpy = findClassByIdRepository.findById;
    const id = fake.uuid();
    await sut.execute({ id });
    expect(findClassByIdSpy).toHaveBeenCalledWith(id);
  });

  it('should throw if FindClassByIdRepository throws', async () => {
    const { sut, findClassByIdRepository } = makeSut();
    const findClassByIdSpy = vi.spyOn(findClassByIdRepository, 'findById');
    const id = fake.uuid();
    findClassByIdSpy.mockRejectedValueOnce(new Error('mock'));
    await expect(sut.execute({ id })).rejects.toThrow(new Error('mock'));
  });

  it('should throw if FindClassByIdRepository returns null', async () => {
    const { sut, findClassByIdRepository } = makeSut();
    const findUserByIdSpy = vi.spyOn(findClassByIdRepository, 'findById');
    const id = fake.uuid();
    findUserByIdSpy.mockResolvedValueOnce(null);
    await expect(sut.execute({ id })).rejects.toThrow(
      new NotFoundError('class not found')
    );
  });

  it('should return data on success', async () => {
    const { sut } = makeSut();
    const id = fake.uuid();
    const dayOffSchool = await sut.execute({ id });
    expect(dayOffSchool).toEqual({
      id: dayOffSchool.id,
      shift: dayOffSchool.shift,
      coursePeriod: dayOffSchool.coursePeriod,
      course: {
        id: dayOffSchool.course.id,
        name: dayOffSchool.course.name,
        duration: dayOffSchool.course.duration
      },
      semester: {
        id: dayOffSchool.semester.id,
        year: dayOffSchool.semester.year,
        semester: dayOffSchool.semester.semester
      },
      createdAt: dayOffSchool.createdAt,
      updatedAt: dayOffSchool.updatedAt
    });
  });
});
