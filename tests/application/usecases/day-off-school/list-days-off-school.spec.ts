import { ListDaysOffSchoolUseCase } from '@/application/usecases/day-off-school/list/list-day-off-school.usecase';
import { ListDaysOffSchoolRepository } from '@/domain/day-off-school/repository/list-days-off-school';
import { describe, expect, it, vi } from 'vitest';
import { makeFakeDayOffSchool } from '../../../@shared/fakes';

const makeListDaysOffSchoolRepository = (): ListDaysOffSchoolRepository => ({
  findAll: vi.fn().mockResolvedValue({ daysOffSchool: [], quantity: 0 })
});

type SutTypes = {
  sut: ListDaysOffSchoolUseCase;
  listDaysOffSchoolRepository: ListDaysOffSchoolRepository;
};

const makeSut = (): SutTypes => {
  const listDaysOffSchoolRepository = makeListDaysOffSchoolRepository();
  const sut = new ListDaysOffSchoolUseCase(listDaysOffSchoolRepository);
  return {
    sut,
    listDaysOffSchoolRepository
  };
};

describe('ListDaysOffSchoolUseCase', () => {
  it('should call listDaysOffSchoolRepository with correct params', async () => {
    const { sut, listDaysOffSchoolRepository } = makeSut();
    await sut.execute({});
    expect(listDaysOffSchoolRepository.findAll).toHaveBeenCalledWith({});
    await sut.execute({ pageNumber: 1 });
    expect(listDaysOffSchoolRepository.findAll).toHaveBeenCalledWith({
      pageNumber: 1
    });
    await sut.execute({ pageSize: 10 });
    expect(listDaysOffSchoolRepository.findAll).toHaveBeenCalledWith({
      pageSize: 10
    });
    await sut.execute({ pageNumber: 1, pageSize: 10 });
    expect(listDaysOffSchoolRepository.findAll).toHaveBeenCalledWith({
      pageNumber: 1,
      pageSize: 10
    });
  });

  it('should throw if listDaysOffSchoolRepository throws', async () => {
    const { sut, listDaysOffSchoolRepository } = makeSut();
    vi.spyOn(listDaysOffSchoolRepository, 'findAll').mockRejectedValueOnce(
      new Error('repo error')
    );
    await expect(sut.execute({})).rejects.toThrow('repo error');
  });
  it('should return correct data when there is no data', async () => {
    const { sut } = makeSut();
    const result = await sut.execute({});
    expect(result).toEqual({
      daysOffSchool: [],
      quantity: 0,
      pageNumber: 1,
      pageSize: undefined
    });
  });

  it('should return the correct data', async () => {
    const { sut, listDaysOffSchoolRepository } = makeSut();
    const schoolSaturday1 = makeFakeDayOffSchool();
    const schoolSaturday2 = makeFakeDayOffSchool();
    vi.spyOn(listDaysOffSchoolRepository, 'findAll').mockResolvedValueOnce({
      daysOffSchool: [schoolSaturday1, schoolSaturday2],
      quantity: 2
    });
    const result = await sut.execute({
      pageNumber: 1,
      pageSize: 50
    });
    expect(result.quantity).toBe(2);
    expect(result.pageNumber).toBe(1);
    expect(result.pageSize).toBe(50);
    expect(result.daysOffSchool.length).toBe(2);
    expect(result.daysOffSchool[0]).toEqual(
      expect.objectContaining({
        id: schoolSaturday1.id,
        description: schoolSaturday1.description,
        type: schoolSaturday1.type,
        dateBegin: schoolSaturday1.dateBegin,
        dateEnd: schoolSaturday1.dateEnd,
        createdAt: schoolSaturday1.createdAt,
        updatedAt: schoolSaturday1.updatedAt
      })
    );
    expect(result.daysOffSchool[1]).toEqual(
      expect.objectContaining({
        id: schoolSaturday2.id,
        description: schoolSaturday2.description,
        type: schoolSaturday2.type,
        dateBegin: schoolSaturday2.dateBegin,
        dateEnd: schoolSaturday2.dateEnd,
        createdAt: schoolSaturday2.createdAt,
        updatedAt: schoolSaturday2.updatedAt
      })
    );
  });
});
