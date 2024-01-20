import { ListSemestersUseCase } from '@/application/usecases/semester/list/list-semesters.usecase';
import { ListSemestersRepository } from '@/domain/semester/repository/list-semesters';
import { describe, expect, it, vi } from 'vitest';
import { makeFakeSemester } from '../../../@shared/fakes';

const makeListSemestersRepository = (): ListSemestersRepository => ({
  findAll: vi.fn().mockResolvedValue({ semesters: [], quantity: 0 })
});

type SutTypes = {
  sut: ListSemestersUseCase;
  listSemestersRepository: ListSemestersRepository;
};

const makeSut = (): SutTypes => {
  const listSemestersRepository = makeListSemestersRepository();
  const sut = new ListSemestersUseCase(listSemestersRepository);
  return {
    sut,
    listSemestersRepository
  };
};

describe('ListSemestersUseCase', () => {
  it('should call listSemestersRepository with correct params', async () => {
    const { sut, listSemestersRepository } = makeSut();
    await sut.execute({});
    expect(listSemestersRepository.findAll).toHaveBeenCalledTimes(1);
    expect(listSemestersRepository.findAll).toHaveBeenCalledWith({});
    await sut.execute({ pageNumber: 1 });
    expect(listSemestersRepository.findAll).toHaveBeenCalledTimes(2);
    expect(listSemestersRepository.findAll).toHaveBeenCalledWith({
      pageNumber: 1
    });
    await sut.execute({ pageSize: 10 });
    expect(listSemestersRepository.findAll).toHaveBeenCalledTimes(3);
    expect(listSemestersRepository.findAll).toHaveBeenCalledWith({
      pageSize: 10
    });
    await sut.execute({ pageNumber: 1, pageSize: 10 });
    expect(listSemestersRepository.findAll).toHaveBeenCalledTimes(4);
    expect(listSemestersRepository.findAll).toHaveBeenCalledWith({
      pageNumber: 1,
      pageSize: 10
    });
  });

  it('should throw if listSemestersRepository throws', async () => {
    const { sut, listSemestersRepository } = makeSut();
    vi.spyOn(listSemestersRepository, 'findAll').mockRejectedValueOnce(
      new Error('repo error')
    );
    await expect(sut.execute({})).rejects.toThrow('repo error');
  });

  it('should return correct data when there is no data', async () => {
    const { sut } = makeSut();
    const result = await sut.execute({});
    expect(result).toEqual({
      semesters: [],
      quantity: 0,
      pageNumber: 1,
      pageSize: undefined
    });
  });

  it('should return the correct data', async () => {
    const { sut, listSemestersRepository } = makeSut();
    const semester1 = makeFakeSemester();
    const semester2 = makeFakeSemester();
    vi.spyOn(listSemestersRepository, 'findAll').mockResolvedValueOnce({
      semesters: [semester1, semester2],
      quantity: 2
    });
    const result = await sut.execute({
      pageNumber: 1,
      pageSize: 50
    });
    expect(result.quantity).toBe(2);
    expect(result.pageNumber).toBe(1);
    expect(result.pageSize).toBe(50);
    expect(result.semesters.length).toBe(2);
    expect(result.semesters[0]).toEqual(
      expect.objectContaining({
        id: semester1.id,
        year: semester1.year,
        semester: semester1.semester,
        startFirstStage: semester1.startFirstStage,
        endFirstStage: semester1.endFirstStage,
        startSecondStage: semester1.startSecondStage,
        endSecondStage: semester1.endSecondStage,
        type: semester1.type,
        createdAt: semester1.createdAt,
        updatedAt: semester1.updatedAt
      })
    );
    expect(result.semesters[1]).toEqual(
      expect.objectContaining({
        id: semester2.id,
        year: semester2.year,
        semester: semester2.semester,
        startFirstStage: semester2.startFirstStage,
        endFirstStage: semester2.endFirstStage,
        startSecondStage: semester2.startSecondStage,
        endSecondStage: semester2.endSecondStage,
        type: semester2.type,
        createdAt: semester2.createdAt,
        updatedAt: semester2.updatedAt
      })
    );
  });
});
