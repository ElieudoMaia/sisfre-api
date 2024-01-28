import { UpdateDayOffSchoolUseCase } from '@/application/usecases/day-off-school/update/update-day-off-school.usecase';
import { UpdateDayOffSchoolUseCaseInputDTO } from '@/application/usecases/day-off-school/update/update-day-off-school.usecase.dto';
import {
  DayOffSchool,
  DayOffSchoolEntityProps,
  DayOffSchoolType
} from '@/domain/day-off-school/entity/day-off-school';
import { FindDayOffSchoolByIdRepository } from '@/domain/day-off-school/repository/find-day-off-school-by-id-repository';
import { FindRecessOrVocationInDateRangeRepository } from '@/domain/day-off-school/repository/find-recess-or-vocation-in-date-range';
import { UpdateDayOffSchoolRepository } from '@/domain/day-off-school/repository/update-day-off-school';
import { describe, expect, it, vi } from 'vitest';
import { fake } from '../../../utils/fake-data-generator';

const dayOffSchoolId = fake.uuid();

const makeDayOffSchool = (
  props: Partial<DayOffSchoolEntityProps>
): DayOffSchool => {
  return new DayOffSchool({
    id: props.id ?? fake.uuid(),
    description: props.description ?? fake.random(10),
    type: props.type ?? DayOffSchoolType.HOLIDAY,
    dateBegin: props.dateBegin ?? new Date(2024, 0, 29),
    dateEnd: props.dateEnd ?? new Date(2024, 0, 30),
    createdAt: props.createdAt,
    updatedAt: props.updatedAt
  });
};

const makeFindDayOffSchoolByIdRepositorySpy =
  (): FindDayOffSchoolByIdRepository => ({
    findById: vi
      .fn()
      .mockResolvedValue(makeDayOffSchool({ id: dayOffSchoolId }))
  });

const makeFindRecessOrVocationInDateRangeRepositorySpy =
  (): FindRecessOrVocationInDateRangeRepository => ({
    findInRange: vi.fn()
  });

const makeUpdateDayOffSchoolRepositorySpy =
  (): UpdateDayOffSchoolRepository => ({
    update: vi.fn()
  });

type SutTypes = {
  findDayOffSchoolByIdRepositorySpy: FindDayOffSchoolByIdRepository;
  findRecessOrVocationInDateRangeRepositorySpy: FindRecessOrVocationInDateRangeRepository;
  updateDayOffSchoolRepositorySpy: UpdateDayOffSchoolRepository;
  sut: UpdateDayOffSchoolUseCase;
};

const makeSut = (): SutTypes => {
  const findDayOffSchoolByIdRepositorySpy =
    makeFindDayOffSchoolByIdRepositorySpy();
  const findRecessOrVocationInDateRangeRepositorySpy =
    makeFindRecessOrVocationInDateRangeRepositorySpy();
  const updateDayOffSchoolRepositorySpy = makeUpdateDayOffSchoolRepositorySpy();

  const sut = new UpdateDayOffSchoolUseCase(
    findDayOffSchoolByIdRepositorySpy,
    findRecessOrVocationInDateRangeRepositorySpy,
    updateDayOffSchoolRepositorySpy
  );

  return {
    sut,
    findDayOffSchoolByIdRepositorySpy,
    findRecessOrVocationInDateRangeRepositorySpy,
    updateDayOffSchoolRepositorySpy
  };
};

const makeFakeInput = (): UpdateDayOffSchoolUseCaseInputDTO => ({
  id: fake.uuid(),
  description: fake.random(10),
  type: DayOffSchoolType.HOLIDAY,
  dateBegin: new Date(2024, 0, 29)
});

describe('UpdateDayOffSchoolUseCase', () => {
  it('should call findDayOffSchoolByIdRepositorySpy with correct params', async () => {
    const { sut, findDayOffSchoolByIdRepositorySpy } = makeSut();
    const input = makeFakeInput();
    await sut.execute(input);
    expect(findDayOffSchoolByIdRepositorySpy.findById).toHaveBeenCalledOnce();
    expect(findDayOffSchoolByIdRepositorySpy.findById).toHaveBeenCalledWith(
      input.id
    );
  });

  it('should throw if findDayOffSchoolByIdRepositorySpy returns null', async () => {
    const { sut, findDayOffSchoolByIdRepositorySpy } = makeSut();
    vi.spyOn(findDayOffSchoolByIdRepositorySpy, 'findById').mockResolvedValue(
      null
    );
    const input = makeFakeInput();
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow('day off school not found');
  });

  it('should throw if findDayOffSchoolByIdRepositorySpy throws', async () => {
    const { sut, findDayOffSchoolByIdRepositorySpy } = makeSut();
    vi.spyOn(findDayOffSchoolByIdRepositorySpy, 'findById').mockRejectedValue(
      new Error('day off school error')
    );
    const input = makeFakeInput();
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow('day off school error');
  });

  it('should call findRecessOrVocationInDateRangeRepositorySpy with correct params if type is RECESS or VOCATION', async () => {
    const { sut, findRecessOrVocationInDateRangeRepositorySpy } = makeSut();
    const input = makeFakeInput();
    input.type = DayOffSchoolType.RECESS;
    input.dateEnd = new Date(2024, 0, 30);

    await sut.execute(input);

    expect(
      findRecessOrVocationInDateRangeRepositorySpy.findInRange
    ).toHaveBeenCalledOnce();
    expect(
      findRecessOrVocationInDateRangeRepositorySpy.findInRange
    ).toHaveBeenCalledWith(input.dateBegin, input.dateEnd);

    input.type = DayOffSchoolType.VOCATION;
    await sut.execute(input);
    expect(
      findRecessOrVocationInDateRangeRepositorySpy.findInRange
    ).toHaveBeenCalledTimes(2);
    expect(
      findRecessOrVocationInDateRangeRepositorySpy.findInRange
    ).toHaveBeenCalledWith(input.dateBegin, input.dateEnd);
  });

  it('should not call findRecessOrVocationInDateRangeRepositorySpy if type is not RECESS or VOCATION', async () => {
    const { sut, findRecessOrVocationInDateRangeRepositorySpy } = makeSut();
    const input = makeFakeInput();
    input.type = DayOffSchoolType.HOLIDAY;
    await sut.execute(input);
    expect(
      findRecessOrVocationInDateRangeRepositorySpy.findInRange
    ).not.toHaveBeenCalled();
  });

  it('should throw if findRecessOrVocationInDateRangeRepositorySpy throws', async () => {
    const { sut, findRecessOrVocationInDateRangeRepositorySpy } = makeSut();
    const input = makeFakeInput();
    input.type = DayOffSchoolType.RECESS;
    input.dateEnd = new Date(2024, 0, 30);
    vi.spyOn(
      findRecessOrVocationInDateRangeRepositorySpy,
      'findInRange'
    ).mockRejectedValue(new Error('find error'));
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow('find error');
  });

  it('should throw if findRecessOrVocationInDateRangeRepositorySpy returns a day off school with diferrent id', async () => {
    const { sut, findRecessOrVocationInDateRangeRepositorySpy } = makeSut();
    const input = makeFakeInput();
    input.type = DayOffSchoolType.RECESS;
    input.dateEnd = new Date(2024, 0, 30);
    vi.spyOn(
      findRecessOrVocationInDateRangeRepositorySpy,
      'findInRange'
    ).mockResolvedValue([makeDayOffSchool({ id: fake.uuid() })]);
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow(
      'Already exists a recess or vocation in this date range'
    );
  });

  it('should not throw if findRecessOrVocationInDateRangeRepositorySpy returns a day off school with same id', async () => {
    const { sut, findRecessOrVocationInDateRangeRepositorySpy } = makeSut();
    const input = makeFakeInput();
    input.type = DayOffSchoolType.RECESS;
    input.dateEnd = new Date(2024, 0, 30);
    vi.spyOn(
      findRecessOrVocationInDateRangeRepositorySpy,
      'findInRange'
    ).mockResolvedValue([makeDayOffSchool({ id: input.id })]);
    const promise = sut.execute(input);
    await expect(promise).resolves.not.toThrow();
  });

  it('should call updateDayOffSchoolRepositorySpy with correct params', async () => {
    const { sut, updateDayOffSchoolRepositorySpy } = makeSut();
    const input = makeFakeInput();
    await sut.execute(input);
    expect(updateDayOffSchoolRepositorySpy.update).toHaveBeenCalledOnce();
    expect(updateDayOffSchoolRepositorySpy.update).toHaveBeenCalledWith(
      expect.objectContaining({
        id: input.id,
        description: input.description,
        type: input.type,
        dateBegin: input.dateBegin,
        dateEnd: input.dateEnd
      })
    );
  });

  it('should throw if updateDayOffSchoolRepositorySpy throws', async () => {
    const { sut, updateDayOffSchoolRepositorySpy } = makeSut();
    vi.spyOn(updateDayOffSchoolRepositorySpy, 'update').mockRejectedValue(
      new Error('update error')
    );
    const input = makeFakeInput();
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow('update error');
  });

  it('should return correct data on success', async () => {
    const { sut } = makeSut();
    const input = makeFakeInput();
    const result = await sut.execute(input);
    expect(result).toEqual(
      expect.objectContaining({
        id: input.id,
        description: input.description,
        type: input.type,
        dateBegin: input.dateBegin,
        dateEnd: input.dateEnd
      })
    );
  });
});
