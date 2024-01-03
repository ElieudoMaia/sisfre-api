import { ListSchoolSaturdaysUseCase } from '@/application/usecases/school-saturday/list/list-school-saturdays.usecase';
import { ListSchoolSaturdaysRepository } from '@/domain/school-saturday/repository/list-school-saturdays';
import { describe, expect, it, vi } from 'vitest';
import { makeFakeSchoolSaturday } from '../../../@shared/fakes';

const makeListSchoolSaturdaysRepository =
  (): ListSchoolSaturdaysRepository => ({
    findAll: vi.fn().mockResolvedValue({ schoolSaturdays: [], quantity: 0 })
  });

type SutTypes = {
  sut: ListSchoolSaturdaysUseCase;
  listSchoolSaturdaysRepository: ListSchoolSaturdaysRepository;
};

const makeSut = (): SutTypes => {
  const listSchoolSaturdaysRepository = makeListSchoolSaturdaysRepository();
  const sut = new ListSchoolSaturdaysUseCase(listSchoolSaturdaysRepository);
  return {
    sut,
    listSchoolSaturdaysRepository
  };
};

describe('ListUsersUseCase', () => {
  it('should call listSchoolSaturdaysRepository with correct params', async () => {
    const { sut, listSchoolSaturdaysRepository } = makeSut();
    await sut.execute({});
    expect(listSchoolSaturdaysRepository.findAll).toHaveBeenCalledWith({});
    await sut.execute({ pageNumber: 1 });
    expect(listSchoolSaturdaysRepository.findAll).toHaveBeenCalledWith({
      pageNumber: 1
    });
    await sut.execute({ pageSize: 10 });
    expect(listSchoolSaturdaysRepository.findAll).toHaveBeenCalledWith({
      pageSize: 10
    });
    await sut.execute({ pageNumber: 1, pageSize: 10 });
    expect(listSchoolSaturdaysRepository.findAll).toHaveBeenCalledWith({
      pageNumber: 1,
      pageSize: 10
    });
  });

  it('should throw if listSchoolSaturdaysRepository throws', async () => {
    const { sut, listSchoolSaturdaysRepository } = makeSut();
    vi.spyOn(listSchoolSaturdaysRepository, 'findAll').mockRejectedValueOnce(
      new Error('repo error')
    );
    await expect(sut.execute({})).rejects.toThrow('repo error');
  });

  it('should return correct data when there is no data', async () => {
    const { sut } = makeSut();
    const result = await sut.execute({});
    expect(result).toEqual({
      schoolSaturdays: [],
      quantity: 0,
      pageNumber: 1,
      pageSize: undefined
    });
  });

  it('should return the correct data', async () => {
    const { sut, listSchoolSaturdaysRepository } = makeSut();
    const schoolSaturday1 = makeFakeSchoolSaturday();
    const schoolSaturday2 = makeFakeSchoolSaturday();
    vi.spyOn(listSchoolSaturdaysRepository, 'findAll').mockResolvedValueOnce({
      schoolSaturdays: [schoolSaturday1, schoolSaturday2],
      quantity: 2
    });
    const result = await sut.execute({
      pageNumber: 1,
      pageSize: 50
    });
    expect(result.quantity).toBe(2);
    expect(result.pageNumber).toBe(1);
    expect(result.pageSize).toBe(50);
    expect(result.schoolSaturdays.length).toBe(2);
    expect(result.schoolSaturdays[0]).toEqual(
      expect.objectContaining({
        id: schoolSaturday1.id,
        dayOfWeek: schoolSaturday1.dayOfWeek,
        date: schoolSaturday1.date,
        createdAt: schoolSaturday1.createdAt,
        updatedAt: schoolSaturday1.updatedAt
      })
    );
    expect(result.schoolSaturdays[1]).toEqual(
      expect.objectContaining({
        id: schoolSaturday2.id,
        dayOfWeek: schoolSaturday2.dayOfWeek,
        date: schoolSaturday2.date,
        createdAt: schoolSaturday2.createdAt,
        updatedAt: schoolSaturday2.updatedAt
      })
    );
  });
});
