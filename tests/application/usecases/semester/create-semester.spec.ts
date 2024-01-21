import { CreateSemesterUseCase } from '@/application/usecases/semester/create/create-semester.usecase';
import { CreateSemesterUseCaseInputDTO } from '@/application/usecases/semester/create/create-semester.usecase.dto';
import {
  Semester,
  SemesterOfYear,
  SemesterType
} from '@/domain/semester/entity/semester';
import { CreateSemesterRepository } from '@/domain/semester/repository/create-semester';
import { FindSemesterByYearRepository } from '@/domain/semester/repository/find-semester-by-year';
import { describe, expect, it, vi } from 'vitest';

const makeFakeFindSemesterByYearRepository = () => ({
  findByYear: vi.fn()
});

const makeFakeCreateSemesterRepository = () => ({
  create: vi.fn()
});

type SutTypes = {
  sut: CreateSemesterUseCase;
  findSemesterByYearRepositorySpy: FindSemesterByYearRepository;
  createSemesterRepositorySpy: CreateSemesterRepository;
};

const makeSut = (): SutTypes => {
  const findSemesterByYearRepositorySpy =
    makeFakeFindSemesterByYearRepository();
  const createSemesterRepositorySpy = makeFakeCreateSemesterRepository();
  const sut = new CreateSemesterUseCase(
    findSemesterByYearRepositorySpy,
    createSemesterRepositorySpy
  );

  return {
    sut,
    findSemesterByYearRepositorySpy,
    createSemesterRepositorySpy
  };
};

const makeFakeInputDTO = (): CreateSemesterUseCaseInputDTO => ({
  year: new Date().getFullYear(),
  semester: 1,
  startFirstStage: new Date(),
  endFirstStage: new Date(),
  startSecondStage: new Date(),
  endSecondStage: new Date(),
  type: 'REGULAR'
});

describe('CreateSemesterUseCase', () => {
  it('should throw on any entity validation error', async () => {
    const { sut } = makeSut();
    let fakeInputDTO = null;

    fakeInputDTO = makeFakeInputDTO();
    fakeInputDTO.year = 0;
    await expect(sut.execute(fakeInputDTO)).rejects.toThrow();

    fakeInputDTO = makeFakeInputDTO();
    fakeInputDTO.semester = 0 as SemesterOfYear;
    await expect(sut.execute(fakeInputDTO)).rejects.toThrow();

    fakeInputDTO = makeFakeInputDTO();
    fakeInputDTO.type = 'INVALID_TYPE' as SemesterType;
    expect(sut.execute(fakeInputDTO)).rejects.toThrow();

    fakeInputDTO = makeFakeInputDTO();
    fakeInputDTO.startFirstStage = new Date('2024-01-02');
    fakeInputDTO.endFirstStage = new Date('2024-01-01');
    expect(sut.execute(fakeInputDTO)).rejects.toThrow();
  });

  it('should cal findSemesterByYearRepository with correct params', async () => {
    const { sut, findSemesterByYearRepositorySpy } = makeSut();
    const fakeInputDTO = makeFakeInputDTO();
    await sut.execute(fakeInputDTO);

    expect(findSemesterByYearRepositorySpy.findByYear).toHaveBeenCalledTimes(1);
    expect(findSemesterByYearRepositorySpy.findByYear).toHaveBeenCalledWith(
      fakeInputDTO.year
    );
  });

  it('should throw if findSemesterByYearRepository throws', async () => {
    const { sut, findSemesterByYearRepositorySpy } = makeSut();
    const fakeInputDTO = makeFakeInputDTO();
    vi.spyOn(
      findSemesterByYearRepositorySpy,
      'findByYear'
    ).mockImplementationOnce(() => {
      throw new Error('fake repo error');
    });

    await expect(sut.execute(fakeInputDTO)).rejects.toThrow('fake repo error');
  });

  it('should throw if semester already exists', async () => {
    const { sut, findSemesterByYearRepositorySpy } = makeSut();
    const fakeInputDTO = makeFakeInputDTO();
    vi.spyOn(
      findSemesterByYearRepositorySpy,
      'findByYear'
    ).mockResolvedValueOnce([
      new Semester({
        year: fakeInputDTO.year,
        semester: fakeInputDTO.semester,
        type: fakeInputDTO.type,
        startFirstStage: new Date(),
        endFirstStage: new Date(),
        startSecondStage: new Date(),
        endSecondStage: new Date()
      })
    ]);

    await expect(sut.execute(fakeInputDTO)).rejects.toThrow(
      'Semester already exists'
    );
  });

  it('should not throw if semester does not exists', async () => {
    const { sut, findSemesterByYearRepositorySpy } = makeSut();
    const fakeInputDTO = makeFakeInputDTO();
    vi.spyOn(
      findSemesterByYearRepositorySpy,
      'findByYear'
    ).mockResolvedValueOnce(null);

    await expect(sut.execute(fakeInputDTO)).resolves.not.toThrow();
  });

  it('should not throw if find semester for same year but different semester', async () => {
    const { sut, findSemesterByYearRepositorySpy } = makeSut();
    const fakeInputDTO = makeFakeInputDTO();
    vi.spyOn(
      findSemesterByYearRepositorySpy,
      'findByYear'
    ).mockResolvedValueOnce([
      new Semester({
        year: fakeInputDTO.year,
        semester: 2,
        type: fakeInputDTO.type,
        startFirstStage: new Date(),
        endFirstStage: new Date(),
        startSecondStage: new Date(),
        endSecondStage: new Date()
      })
    ]);

    await expect(sut.execute(fakeInputDTO)).resolves.not.toThrow();
  });

  it('should not throw if find semester for same year but different type', async () => {
    const { sut, findSemesterByYearRepositorySpy } = makeSut();
    const fakeInputDTO = makeFakeInputDTO();
    vi.spyOn(
      findSemesterByYearRepositorySpy,
      'findByYear'
    ).mockResolvedValueOnce([
      new Semester({
        year: fakeInputDTO.year,
        semester: fakeInputDTO.semester,
        type: 'CONVENTIONAL',
        startFirstStage: new Date(),
        endFirstStage: new Date(),
        startSecondStage: new Date(),
        endSecondStage: new Date()
      })
    ]);

    await expect(sut.execute(fakeInputDTO)).resolves.not.toThrow();
  });

  it('should call createSemesterRepository with correct params', async () => {
    const { sut, createSemesterRepositorySpy } = makeSut();
    const fakeInputDTO = makeFakeInputDTO();
    await sut.execute(fakeInputDTO);

    expect(createSemesterRepositorySpy.create).toHaveBeenCalledTimes(1);
    expect(createSemesterRepositorySpy.create).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(String),
        year: fakeInputDTO.year,
        semester: fakeInputDTO.semester,
        startFirstStage: fakeInputDTO.startFirstStage,
        endFirstStage: fakeInputDTO.endFirstStage,
        startSecondStage: fakeInputDTO.startSecondStage,
        endSecondStage: fakeInputDTO.endSecondStage,
        type: fakeInputDTO.type,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      })
    );
  });

  it('should throw if createSemesterRepository throws', async () => {
    const { sut, createSemesterRepositorySpy } = makeSut();
    const fakeInputDTO = makeFakeInputDTO();
    vi.spyOn(createSemesterRepositorySpy, 'create').mockImplementationOnce(
      () => {
        throw new Error('fake repo error');
      }
    );

    await expect(sut.execute(fakeInputDTO)).rejects.toThrow('fake repo error');
  });

  it('should return correct output on success', async () => {
    const { sut } = makeSut();
    const fakeInputDTO = makeFakeInputDTO();
    const result = await sut.execute(fakeInputDTO);
    expect(result).toEqual({
      id: expect.any(String),
      year: fakeInputDTO.year,
      semester: fakeInputDTO.semester,
      startFirstStage: fakeInputDTO.startFirstStage,
      endFirstStage: fakeInputDTO.endFirstStage,
      startSecondStage: fakeInputDTO.startSecondStage,
      endSecondStage: fakeInputDTO.endSecondStage,
      type: fakeInputDTO.type,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    });
  });
});
