import { CreateSchoolSaturdayUseCase } from '@/application/usecases/school-saturday/create/create-school-saturday.usecase';
import {
  CreateSchoolSaturdayUseCaseInputDTO,
  CreateSchoolSaturdayUseCaseOutputDTO
} from '@/application/usecases/school-saturday/create/create-school-saturday.usecase.dto';
import {
  ReferencedDayOfWeek,
  SchoolSaturday
} from '@/domain/school-saturday/entity/school-saturday';
import { CreateSchoolSaturdayRepository } from '@/domain/school-saturday/repository/create-school-saturday';
import { FindSchoolSaturdayByDateRepository } from '@/domain/school-saturday/repository/find-school-saturday-by-date';
import { describe, expect, it, vi } from 'vitest';

const makeFindSchoolSaturdayByDateRepositoryMock =
  (): FindSchoolSaturdayByDateRepository => ({
    findByDate: vi.fn()
  });

const makeCreateSchoolSaturdayRepositoryMock =
  (): CreateSchoolSaturdayRepository => ({
    create: vi.fn()
  });

type SutTypes = {
  sut: CreateSchoolSaturdayUseCase;
  findSchoolSaturdayByDateRepositoryMock: FindSchoolSaturdayByDateRepository;
  createSchoolSaturdayRepositoryMock: CreateSchoolSaturdayRepository;
};

const makeSut = (): SutTypes => {
  const findSchoolSaturdayByDateRepositoryMock =
    makeFindSchoolSaturdayByDateRepositoryMock();
  const createSchoolSaturdayRepositoryMock =
    makeCreateSchoolSaturdayRepositoryMock();
  const sut = new CreateSchoolSaturdayUseCase(
    findSchoolSaturdayByDateRepositoryMock,
    createSchoolSaturdayRepositoryMock
  );
  return {
    sut,
    findSchoolSaturdayByDateRepositoryMock,
    createSchoolSaturdayRepositoryMock
  };
};

const makeFakeSchoolSaturday = ({ id = undefined } = {}) => {
  return new SchoolSaturday({
    id,
    referringTo: 'MONDAY',
    date: new Date(2101, 0, 1)
  });
};

const makeFakeCreateSchoolSaturdayUseCaseInputDTO =
  (): CreateSchoolSaturdayUseCaseInputDTO => ({
    referringTo: 'MONDAY',
    date: new Date(2101, 0, 1)
  });

describe('CreateSchoolSaturdayUseCase', () => {
  it('should throw if refferingTo is invalid', async () => {
    const { sut } = makeSut();

    const promise = sut.execute({
      referringTo: 'INVALID' as ReferencedDayOfWeek,
      date: new Date(2101, 0, 1)
    });
    await expect(promise).rejects.toThrow(
      'referringTo must be one of: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY'
    );

    const promise2 = sut.execute({
      referringTo: '' as ReferencedDayOfWeek,
      date: new Date(2101, 0, 1)
    });
    await expect(promise2).rejects.toThrow(
      'referringTo must be one of: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY'
    );
  });

  it('should throw if date is invalid', async () => {
    const { sut } = makeSut();

    const promise = sut.execute({
      referringTo: 'MONDAY',
      date: new Date(2023, 11, 17) // 17/12/2023 is a past date is not a saturday
    });

    await expect(promise).rejects.toThrow(
      /(date must be a saturday|date must not be today or a past date)/
    );
  });

  it('should call FindSchoolSaturdayByDateRepository with correct date', async () => {
    const { sut, findSchoolSaturdayByDateRepositoryMock } = makeSut();
    const fakeCreateSchoolSaturdayUseCaseInputDTO =
      makeFakeCreateSchoolSaturdayUseCaseInputDTO();
    await sut.execute(fakeCreateSchoolSaturdayUseCaseInputDTO);
    expect(
      findSchoolSaturdayByDateRepositoryMock.findByDate
    ).toHaveBeenCalledWith(fakeCreateSchoolSaturdayUseCaseInputDTO.date);
  });

  it('should throw if FindSchoolSaturdayByDateRepository throws', async () => {
    const { sut, findSchoolSaturdayByDateRepositoryMock } = makeSut();
    vi.spyOn(
      findSchoolSaturdayByDateRepositoryMock,
      'findByDate'
    ).mockRejectedValueOnce(
      new Error('any_find_school_saturday_by_date_repository_error')
    );
    const promise = sut.execute(makeFakeCreateSchoolSaturdayUseCaseInputDTO());
    await expect(promise).rejects.toThrow(
      'any_find_school_saturday_by_date_repository_error'
    );
  });

  it('should throw if FindSchoolSaturdayByDateRepository returns a school saturday', async () => {
    const { sut, findSchoolSaturdayByDateRepositoryMock } = makeSut();
    vi.spyOn(
      findSchoolSaturdayByDateRepositoryMock,
      'findByDate'
    ).mockResolvedValueOnce(makeFakeSchoolSaturday());
    const promise = sut.execute(makeFakeCreateSchoolSaturdayUseCaseInputDTO());
    await expect(promise).rejects.toThrow(
      'already exists a school saturday on date'
    );
  });

  it('should call CreateSchoolSaturdayRepository with correct values', async () => {
    const { sut, createSchoolSaturdayRepositoryMock } = makeSut();
    const input = makeFakeCreateSchoolSaturdayUseCaseInputDTO();
    await sut.execute(input);
    expect(createSchoolSaturdayRepositoryMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(String),
        referringTo: input.referringTo,
        date: input.date
      })
    );
  });

  it('should throw if CreateSchoolSaturdayRepository throws', async () => {
    const { sut, createSchoolSaturdayRepositoryMock } = makeSut();
    vi.spyOn(
      createSchoolSaturdayRepositoryMock,
      'create'
    ).mockRejectedValueOnce(
      new Error('any_create_school_saturday_repository_error')
    );
    const promise = sut.execute(makeFakeCreateSchoolSaturdayUseCaseInputDTO());
    await expect(promise).rejects.toThrow(
      'any_create_school_saturday_repository_error'
    );
  });

  it('should return a school saturday on success', async () => {
    const { sut } = makeSut();
    const input = makeFakeCreateSchoolSaturdayUseCaseInputDTO();
    const schoolSaturday = await sut.execute(input);
    expect(schoolSaturday).toEqual(
      expect.objectContaining<CreateSchoolSaturdayUseCaseOutputDTO>({
        id: expect.any(String),
        referringTo: input.referringTo,
        date: input.date,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      })
    );
    expect(schoolSaturday.createdAt).toEqual(schoolSaturday.updatedAt);
  });
});
