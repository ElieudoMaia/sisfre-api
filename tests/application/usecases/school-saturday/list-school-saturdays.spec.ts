import { ListSchoolSaturdaysUseCase } from '@/application/usecases/school-saturday/list/list-school-saturdays.usecase';
import { ListSchoolSaturdaysRepository } from '@/domain/school-saturday/repository/list-school-saturdays';
import { describe, expect, it, vi } from 'vitest';
import { makeFakeSchoolSaturday } from '../../../@shared/fakes';

const makeListSchoolSatudaysRepository = (): ListSchoolSaturdaysRepository => ({
  findAll: vi.fn().mockResolvedValue({ schoolSaturdays: [], quantity: 0 })
});

type SutTypes = {
  sut: ListSchoolSaturdaysUseCase;
  listSchoolSatudaysRepository: ListSchoolSaturdaysRepository;
};

const makeSut = (): SutTypes => {
  const listSchoolSatudaysRepository = makeListSchoolSatudaysRepository();
  const sut = new ListSchoolSaturdaysUseCase(listSchoolSatudaysRepository);
  return {
    sut,
    listSchoolSatudaysRepository
  };
};

describe('ListUsersUseCase', () => {
  it('should call listSchoolSatudaysRepository with correct params', async () => {
    const { sut, listSchoolSatudaysRepository } = makeSut();
    await sut.execute({});
    expect(listSchoolSatudaysRepository.findAll).toHaveBeenCalledWith({});
    await sut.execute({ pageNumber: 1 });
    expect(listSchoolSatudaysRepository.findAll).toHaveBeenCalledWith({
      pageNumber: 1
    });
    await sut.execute({ pageSize: 10 });
    expect(listSchoolSatudaysRepository.findAll).toHaveBeenCalledWith({
      pageSize: 10
    });
    await sut.execute({ pageNumber: 1, pageSize: 10 });
    expect(listSchoolSatudaysRepository.findAll).toHaveBeenCalledWith({
      pageNumber: 1,
      pageSize: 10
    });
  });

  it('should throw if listSchoolSatudaysRepository throws', async () => {
    const { sut, listSchoolSatudaysRepository } = makeSut();
    vi.spyOn(listSchoolSatudaysRepository, 'findAll').mockRejectedValueOnce(
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
    const { sut, listSchoolSatudaysRepository } = makeSut();
    const schoolSaturday1 = makeFakeSchoolSaturday();
    const schoolSaturday2 = makeFakeSchoolSaturday();
    vi.spyOn(listSchoolSatudaysRepository, 'findAll').mockResolvedValueOnce({
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
        referringTo: schoolSaturday1.referringTo,
        date: schoolSaturday1.date,
        createdAt: schoolSaturday1.createdAt,
        updatedAt: schoolSaturday1.updatedAt
      })
    );
    expect(result.schoolSaturdays[1]).toEqual(
      expect.objectContaining({
        id: schoolSaturday2.id,
        referringTo: schoolSaturday2.referringTo,
        date: schoolSaturday2.date,
        createdAt: schoolSaturday2.createdAt,
        updatedAt: schoolSaturday2.updatedAt
      })
    );
  });
});
