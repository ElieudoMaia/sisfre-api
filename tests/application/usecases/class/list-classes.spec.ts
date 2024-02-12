import { ListClassesUseCase } from '@/application/usecases/class/list/list-class.usecase';
import { ListClassesRepository } from '@/domain/class/repository/list-classes';
import { describe, expect, it, vi } from 'vitest';
import { makeFakeClass } from '../../../@shared/fakes';

const makeListClassesRepository = (): ListClassesRepository => ({
  findAll: vi.fn().mockResolvedValue({ classes: [], quantity: 0 })
});

type SutTypes = {
  sut: ListClassesUseCase;
  listClassesRepositorySpy: ListClassesRepository;
};

const makeSut = (): SutTypes => {
  const listClassesRepositorySpy = makeListClassesRepository();
  const sut = new ListClassesUseCase(listClassesRepositorySpy);
  return {
    sut,
    listClassesRepositorySpy
  };
};

describe('ListClassesUseCase', () => {
  it('should call listClassesRepository with correct params', async () => {
    const { sut, listClassesRepositorySpy } = makeSut();
    await sut.execute({});
    expect(listClassesRepositorySpy.findAll).toHaveBeenCalledWith({});
    await sut.execute({ pageNumber: 1 });
    expect(listClassesRepositorySpy.findAll).toHaveBeenCalledWith({
      pageNumber: 1
    });
    await sut.execute({ pageSize: 10 });
    expect(listClassesRepositorySpy.findAll).toHaveBeenCalledWith({
      pageSize: 10
    });
    await sut.execute({ pageNumber: 1, pageSize: 10 });
    expect(listClassesRepositorySpy.findAll).toHaveBeenCalledWith({
      pageNumber: 1,
      pageSize: 10
    });
  });

  it('should throw if listClassesRepository throws', async () => {
    const { sut, listClassesRepositorySpy } = makeSut();
    vi.spyOn(listClassesRepositorySpy, 'findAll').mockRejectedValueOnce(
      new Error('repo error')
    );
    await expect(sut.execute({})).rejects.toThrow('repo error');
  });

  it('should return correct data when there is no data', async () => {
    const { sut } = makeSut();
    const result = await sut.execute({});
    expect(result).toEqual({
      classes: [],
      quantity: 0,
      pageNumber: 1,
      pageSize: undefined
    });
  });

  it('should return the correct data', async () => {
    const { sut, listClassesRepositorySpy } = makeSut();
    const class1 = makeFakeClass();
    const class2 = makeFakeClass();
    vi.spyOn(listClassesRepositorySpy, 'findAll').mockResolvedValueOnce({
      classes: [class1, class2],
      quantity: 2
    });
    const result = await sut.execute({
      pageNumber: 1,
      pageSize: 50
    });
    expect(result.quantity).toBe(2);
    expect(result.pageNumber).toBe(1);
    expect(result.pageSize).toBe(50);
    expect(result.classes.length).toBe(2);
    expect(result.classes[0]).toEqual(
      expect.objectContaining({
        id: class1.id,
        shift: class1.shift,
        coursePeriod: class1.coursePeriod,
        course: {
          id: class1.course.id,
          name: class1.course.name,
          duration: class1.course.duration
        },
        semester: {
          id: class1.semester.id,
          year: class1.semester.year,
          semester: class1.semester.semester
        },
        createdAt: class1.createdAt,
        updatedAt: class1.updatedAt
      })
    );
    expect(result.classes[1]).toEqual(
      expect.objectContaining({
        id: class2.id,
        shift: class2.shift,
        coursePeriod: class2.coursePeriod,
        course: {
          id: class2.course.id,
          name: class2.course.name,
          duration: class2.course.duration
        },
        semester: {
          id: class2.semester.id,
          year: class2.semester.year,
          semester: class2.semester.semester
        },
        createdAt: class2.createdAt,
        updatedAt: class2.updatedAt
      })
    );
  });
});
