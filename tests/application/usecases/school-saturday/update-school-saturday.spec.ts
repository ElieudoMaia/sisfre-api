import { UpdateSchoolSaturdayUseCase } from '@/application/usecases/school-saturday/update/update-school-saturday.usecase';
import { UpdateSchoolSaturdayUseCaseInputDTO } from '@/application/usecases/school-saturday/update/update-school-saturday.usecase.dto';
import { SchoolSaturday } from '@/domain/school-saturday/entity/school-saturday';
import { FindSchoolSaturdayByDateRepository } from '@/domain/school-saturday/repository/find-school-saturday-by-date';
import { FindSchoolSaturdayByIdRepository } from '@/domain/school-saturday/repository/find-school-saturday-by-id';
import { UpdateSchoolSaturdayRepository } from '@/domain/school-saturday/repository/update-school-saturday';
import { describe, expect, it, vi } from 'vitest';
import { makeFakeSchoolSaturday } from '../../../@shared/fakes';
import { fake } from '../../../utils/fake-data-generator';

const schoolSaturdayId = fake.uuid();
const schoolSaturdayCreatedAt = new Date();
schoolSaturdayCreatedAt.setSeconds(schoolSaturdayCreatedAt.getSeconds() - 1);

const makeFindSchoolSaturdayByIdRepositoryMock =
  (): FindSchoolSaturdayByIdRepository => ({
    findById: vi.fn().mockResolvedValue(
      makeFakeSchoolSaturday({
        id: schoolSaturdayId,
        createdAt: schoolSaturdayCreatedAt
      })
    )
  });

const makeFindSchoolSaturdayByDateRepositoryMock =
  (): FindSchoolSaturdayByDateRepository => ({
    findByDate: vi.fn()
  });

const makeUpdateSchoolSaturdayRepositoryStub =
  (): UpdateSchoolSaturdayRepository => ({
    update: vi.fn()
  });

type SutTypes = {
  sut: UpdateSchoolSaturdayUseCase;
  findSchoolSaturdayByIdRepositoryMock: FindSchoolSaturdayByIdRepository;
  findSchoolSaturdayByDateRepositoryMock: FindSchoolSaturdayByDateRepository;
  updateSchoolSaturdayRepositoryStub: UpdateSchoolSaturdayRepository;
};

const makeSut = (): SutTypes => {
  const findSchoolSaturdayByIdRepositoryMock =
    makeFindSchoolSaturdayByIdRepositoryMock();
  const findSchoolSaturdayByDateRepositoryMock =
    makeFindSchoolSaturdayByDateRepositoryMock();
  const updateSchoolSaturdayRepositoryStub =
    makeUpdateSchoolSaturdayRepositoryStub();
  const sut = new UpdateSchoolSaturdayUseCase(
    findSchoolSaturdayByIdRepositoryMock,
    findSchoolSaturdayByDateRepositoryMock,
    updateSchoolSaturdayRepositoryStub
  );

  return {
    sut,
    findSchoolSaturdayByIdRepositoryMock,
    findSchoolSaturdayByDateRepositoryMock,
    updateSchoolSaturdayRepositoryStub
  };
};

const makeFakeUpdateSchoolSaturdayUseCaseInputDTO =
  (): UpdateSchoolSaturdayUseCaseInputDTO => ({
    id: schoolSaturdayId,
    dayOfWeek: 'WEDNESDAY',
    date: new Date(2101, 0, 1)
  });

describe('UpdateSchoolSaturdayUseCase', () => {
  it('should call FindSchoolSaturdayByIdRepository with correct params', async () => {
    const { sut, findSchoolSaturdayByIdRepositoryMock } = makeSut();
    const input = makeFakeUpdateSchoolSaturdayUseCaseInputDTO();
    await sut.execute(input);
    expect(findSchoolSaturdayByIdRepositoryMock.findById).toHaveBeenCalledWith(
      input.id
    );
  });

  it('should throw if FindSchoolSaturdayByIdRepository returns null', async () => {
    const { sut, findSchoolSaturdayByIdRepositoryMock } = makeSut();
    vi.spyOn(
      findSchoolSaturdayByIdRepositoryMock,
      'findById'
    ).mockResolvedValue(null);
    const input = makeFakeUpdateSchoolSaturdayUseCaseInputDTO();
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow('school saturday not found');
  });

  it('should throw if FindSchoolSaturdayByIdRepository throws', async () => {
    const { sut, findSchoolSaturdayByIdRepositoryMock } = makeSut();
    vi.spyOn(
      findSchoolSaturdayByIdRepositoryMock,
      'findById'
    ).mockRejectedValue(new Error('any_error'));
    const input = makeFakeUpdateSchoolSaturdayUseCaseInputDTO();
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow('any_error');
  });

  it('should throw if nothing changed', async () => {
    const { sut, findSchoolSaturdayByIdRepositoryMock } = makeSut();
    const input = makeFakeUpdateSchoolSaturdayUseCaseInputDTO();
    vi.spyOn(
      findSchoolSaturdayByIdRepositoryMock,
      'findById'
    ).mockResolvedValueOnce(
      new SchoolSaturday({
        id: input.id,
        dayOfWeek: input.dayOfWeek,
        date: input.date,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    );
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow('nothing changed');
  });

  it('should call FindSchoolSaturdayByDateRepository with correct params', async () => {
    const { sut, findSchoolSaturdayByDateRepositoryMock } = makeSut();
    const input = makeFakeUpdateSchoolSaturdayUseCaseInputDTO();
    await sut.execute(input);
    expect(
      findSchoolSaturdayByDateRepositoryMock.findByDate
    ).toHaveBeenCalledWith(input.date);
  });

  it('should throw if FindSchoolSaturdayByDateRepository throws', async () => {
    const { sut, findSchoolSaturdayByDateRepositoryMock } = makeSut();
    vi.spyOn(
      findSchoolSaturdayByDateRepositoryMock,
      'findByDate'
    ).mockRejectedValue(new Error('any_error'));
    const input = makeFakeUpdateSchoolSaturdayUseCaseInputDTO();
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow('any_error');
  });

  it('should throw if already exists a school saturday on date', async () => {
    const { sut, findSchoolSaturdayByDateRepositoryMock } = makeSut();
    vi.spyOn(
      findSchoolSaturdayByDateRepositoryMock,
      'findByDate'
    ).mockResolvedValueOnce(makeFakeSchoolSaturday());
    const input = makeFakeUpdateSchoolSaturdayUseCaseInputDTO();
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow(
      'already exists a school saturday on date'
    );
  });

  it('should not trow if already exists a school saturday on date but is the same id', async () => {
    const { sut, findSchoolSaturdayByDateRepositoryMock } = makeSut();
    const input = makeFakeUpdateSchoolSaturdayUseCaseInputDTO();
    vi.spyOn(
      findSchoolSaturdayByDateRepositoryMock,
      'findByDate'
    ).mockResolvedValueOnce(
      new SchoolSaturday({
        id: input.id,
        dayOfWeek: input.dayOfWeek,
        date: input.date,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    );
    const promise = sut.execute(input);
    await expect(promise).resolves.toBeDefined();
  });

  it('should call UpdateSchoolSaturdayRepository with correct params', async () => {
    const { sut, updateSchoolSaturdayRepositoryStub } = makeSut();
    const input = makeFakeUpdateSchoolSaturdayUseCaseInputDTO();
    await sut.execute(input);
    expect(updateSchoolSaturdayRepositoryStub.update).toHaveBeenCalledWith(
      expect.objectContaining({
        id: input.id,
        dayOfWeek: input.dayOfWeek,
        date: input.date,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      })
    );
    expect(updateSchoolSaturdayRepositoryStub.update).toHaveBeenCalledTimes(1);
  });

  it('should throw if UpdateSchoolSaturdayRepository throws', async () => {
    const { sut, updateSchoolSaturdayRepositoryStub } = makeSut();
    vi.spyOn(updateSchoolSaturdayRepositoryStub, 'update').mockRejectedValue(
      new Error('any_error')
    );
    const input = makeFakeUpdateSchoolSaturdayUseCaseInputDTO();
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow('any_error');
  });

  it('should return correct data on success', async () => {
    const { sut } = makeSut();
    const input = makeFakeUpdateSchoolSaturdayUseCaseInputDTO();
    const result = await sut.execute(input);
    expect(result).toEqual(
      expect.objectContaining({
        id: input.id,
        dayOfWeek: input.dayOfWeek,
        date: input.date,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      })
    );
    expect(result.createdAt !== result.updatedAt).toBe(true);
    expect(result.createdAt < result.updatedAt).toBe(true);
  });
});
