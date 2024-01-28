import { CreateDayOffSchoolUseCase } from '@/application/usecases/day-off-school/create/create-day-off-school.usecase';
import { CreateDayOffSchoolUseCaseInputDTO } from '@/application/usecases/day-off-school/create/create-day-off-school.usecase.dto';
import { DayOffSchoolType } from '@/domain/day-off-school/entity/day-off-school';
import { CheckHasRecessOrVocationInDateRangeRepository } from '@/domain/day-off-school/repository/check-has-recess-or-vocation-In-date-range';
import { CreateDayOffSchoolRepository } from '@/domain/day-off-school/repository/create-day-off-school';
import { describe, expect, it, vi } from 'vitest';

const makeCheckHasRecessOrVocationInDateRangeRepositorySpy =
  (): CheckHasRecessOrVocationInDateRangeRepository => ({
    checkByDateRange: vi.fn().mockResolvedValue(false)
  });

const makeCreateDayOffSchoolRepositorySpy =
  (): CreateDayOffSchoolRepository => ({
    create: vi.fn()
  });

type SutTypes = {
  checkHasRecessOrVocationInDateRangeRepositorySpy: CheckHasRecessOrVocationInDateRangeRepository;
  createDayOffSchoolRepositorySpy: CreateDayOffSchoolRepository;
  sut: CreateDayOffSchoolUseCase;
};

const makeSut = (): SutTypes => {
  const checkHasRecessOrVocationInDateRangeRepositorySpy =
    makeCheckHasRecessOrVocationInDateRangeRepositorySpy();
  const createDayOffSchoolRepositorySpy = makeCreateDayOffSchoolRepositorySpy();
  const sut = new CreateDayOffSchoolUseCase(
    checkHasRecessOrVocationInDateRangeRepositorySpy,
    createDayOffSchoolRepositorySpy
  );
  return {
    sut,
    checkHasRecessOrVocationInDateRangeRepositorySpy,
    createDayOffSchoolRepositorySpy
  };
};

const makeFakeCreateDayOffSchoolInput =
  (): CreateDayOffSchoolUseCaseInputDTO => ({
    description: 'any_description',
    type: DayOffSchoolType.HOLIDAY,
    dateBegin: new Date('2024-1-29'),
    dateEnd: new Date('2024-1-30')
  });

describe('CreateDayOffSchoolUseCase', () => {
  it('should throw entity erros when input is invalid', async () => {
    const { sut } = makeSut();
    const input1 = makeFakeCreateDayOffSchoolInput();
    input1.description = '';
    const promise1 = sut.execute(input1);
    await expect(promise1).rejects.toThrowError('description is required');

    const input2 = makeFakeCreateDayOffSchoolInput();
    input2.type = undefined as unknown as DayOffSchoolType;
    const promise2 = sut.execute(input2);
    await expect(promise2).rejects.toThrowError('type is required');

    const input3 = makeFakeCreateDayOffSchoolInput();
    input3.dateBegin = undefined as unknown as Date;
    const promise3 = sut.execute(input3);
    await expect(promise3).rejects.toThrowError('dateBegin is required');
  });

  it('should not call checkHasRecessOrVocationInDateRangeRepository when type is not RECESS or VOCATION', async () => {
    const { sut, checkHasRecessOrVocationInDateRangeRepositorySpy } = makeSut();
    const input = makeFakeCreateDayOffSchoolInput();
    input.type = DayOffSchoolType.HOLIDAY;
    await sut.execute(input);
    expect(
      checkHasRecessOrVocationInDateRangeRepositorySpy.checkByDateRange
    ).not.toHaveBeenCalled();
  });

  it('should throw if checkHasRecessOrVocationInDateRangeRepository throws', async () => {
    const { sut, checkHasRecessOrVocationInDateRangeRepositorySpy } = makeSut();
    vi.spyOn(
      checkHasRecessOrVocationInDateRangeRepositorySpy,
      'checkByDateRange'
    ).mockRejectedValueOnce(new Error('any_error'));

    const input = makeFakeCreateDayOffSchoolInput();
    input.type = DayOffSchoolType.RECESS;

    const promise = sut.execute(input);
    await expect(promise).rejects.toThrowError('any_error');
  });

  it('should call checkHasRecessOrVocationInDateRangeRepository when type is RECESS or VOCATION', async () => {
    const { sut, checkHasRecessOrVocationInDateRangeRepositorySpy } = makeSut();
    const input = makeFakeCreateDayOffSchoolInput();
    input.type = DayOffSchoolType.RECESS;
    await sut.execute(input);
    expect(
      checkHasRecessOrVocationInDateRangeRepositorySpy.checkByDateRange
    ).toHaveBeenCalledTimes(1);
    expect(
      checkHasRecessOrVocationInDateRangeRepositorySpy.checkByDateRange
    ).toHaveBeenCalledWith(input.dateBegin, input.dateEnd);

    input.type = DayOffSchoolType.VOCATION;
    await sut.execute(input);
    expect(
      checkHasRecessOrVocationInDateRangeRepositorySpy.checkByDateRange
    ).toHaveBeenCalledTimes(2);
    expect(
      checkHasRecessOrVocationInDateRangeRepositorySpy.checkByDateRange
    ).toHaveBeenCalledWith(input.dateBegin, input.dateEnd);
  });

  it('should throw InvalidParamError when checkHasRecessOrVocationInDateRangeRepository returns true', async () => {
    const { sut, checkHasRecessOrVocationInDateRangeRepositorySpy } = makeSut();
    vi.spyOn(
      checkHasRecessOrVocationInDateRangeRepositorySpy,
      'checkByDateRange'
    ).mockResolvedValueOnce(true);

    const input = makeFakeCreateDayOffSchoolInput();
    input.type = DayOffSchoolType.RECESS;

    const promise = sut.execute(input);
    await expect(promise).rejects.toThrowError(
      'Already exists a recess or vocation in this date range'
    );
  });

  it('should call createDayOffSchoolRepository with correct values', async () => {
    const { sut, createDayOffSchoolRepositorySpy } = makeSut();
    const input = makeFakeCreateDayOffSchoolInput();
    await sut.execute(input);
    expect(createDayOffSchoolRepositorySpy.create).toHaveBeenCalledTimes(1);
    expect(createDayOffSchoolRepositorySpy.create).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(String),
        description: input.description,
        type: input.type,
        dateBegin: input.dateBegin
      })
    );
  });

  it('should throw if createDayOffSchoolRepository throws', async () => {
    const { sut, createDayOffSchoolRepositorySpy } = makeSut();
    vi.spyOn(createDayOffSchoolRepositorySpy, 'create').mockRejectedValueOnce(
      new Error('any_error')
    );

    const input = makeFakeCreateDayOffSchoolInput();

    const promise = sut.execute(input);
    await expect(promise).rejects.toThrowError('any_error');
  });

  it('should return correct values on success', async () => {
    const { sut } = makeSut();
    const input = makeFakeCreateDayOffSchoolInput();
    const output = await sut.execute(input);
    expect(output).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        description: input.description,
        type: input.type,
        dateBegin: input.dateBegin,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      })
    );
  });
});
