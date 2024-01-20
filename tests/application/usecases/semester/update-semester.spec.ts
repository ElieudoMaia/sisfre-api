import { UpdateSemesterUseCase } from '@/application/usecases/semester/update/update-semester.usecase';
import { UpdateSemesterUseCaseInputDTO } from '@/application/usecases/semester/update/update-semester.usecase.dto';
import {
  Semester,
  SemesterOfYear,
  SemesterType
} from '@/domain/semester/entity/semester';
import { FindSemesterByIdRepository } from '@/domain/semester/repository/find-semester-by-id';
import { FindSemesterByYearRepository } from '@/domain/semester/repository/find-semester-by-year';
import { UpdateSemesterRepository } from '@/domain/semester/repository/update-semester';
import { describe, expect, it, vi } from 'vitest';
import { fake } from '../../../utils/fake-data-generator';

const semesterId = fake.uuid();

const makeFakeSemester = ({ id = fake.uuid() } = {}) => {
  return new Semester({
    id,
    year: new Date().getFullYear(),
    semester: 1,
    startFirstStage: new Date(),
    endFirstStage: new Date(),
    startSecondStage: new Date(),
    endSecondStage: new Date(),
    type: 'REGULAR',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  });
};

const makeFakeFindSemesterByIdRepository = () => ({
  findById: vi.fn().mockResolvedValue(makeFakeSemester({ id: semesterId }))
});

const makeFakeFindSemesterByYearRepository = () => ({
  findByYear: vi.fn()
});

const makeFakeUpdateSemesterRepository = () => ({
  update: vi.fn()
});

type SutTypes = {
  sut: UpdateSemesterUseCase;
  findSemesterByIdRepositorySpy: FindSemesterByIdRepository;
  findSemesterByYearRepositorySpy: FindSemesterByYearRepository;
  updateSemesterRepositorySpy: UpdateSemesterRepository;
};

const makeSut = (): SutTypes => {
  const findSemesterByIdRepositorySpy = makeFakeFindSemesterByIdRepository();
  const findSemesterByYearRepositorySpy =
    makeFakeFindSemesterByYearRepository();
  const updateSemesterRepositorySpy = makeFakeUpdateSemesterRepository();
  const sut = new UpdateSemesterUseCase(
    findSemesterByIdRepositorySpy,
    findSemesterByYearRepositorySpy,
    updateSemesterRepositorySpy
  );

  return {
    sut,
    findSemesterByIdRepositorySpy,
    findSemesterByYearRepositorySpy,
    updateSemesterRepositorySpy
  };
};

const makeFakeInputDTO = (): UpdateSemesterUseCaseInputDTO => ({
  id: semesterId,
  year: new Date().getFullYear(),
  semester: 1,
  startFirstStage: new Date(),
  endFirstStage: new Date(),
  startSecondStage: new Date(),
  endSecondStage: new Date(),
  type: 'REGULAR'
});

describe('UpdateSemesterUseCase', () => {
  it('should call findSemesterByIdRepository with correct params', async () => {
    const { sut, findSemesterByIdRepositorySpy } = makeSut();
    const fakeInputDTO = makeFakeInputDTO();
    await sut.execute(fakeInputDTO);

    expect(findSemesterByIdRepositorySpy.findById).toHaveBeenCalledTimes(1);
    expect(findSemesterByIdRepositorySpy.findById).toHaveBeenCalledWith(
      fakeInputDTO.id
    );
  });

  it('should throw if findSemesterByIdRepository throws', async () => {
    const { sut, findSemesterByIdRepositorySpy } = makeSut();
    const fakeInputDTO = makeFakeInputDTO();
    vi.spyOn(findSemesterByIdRepositorySpy, 'findById').mockImplementationOnce(
      () => {
        throw new Error('fake repo error');
      }
    );

    await expect(sut.execute(fakeInputDTO)).rejects.toThrow('fake repo error');
  });

  it('should throw if semester not found', async () => {
    const { sut, findSemesterByIdRepositorySpy } = makeSut();
    const fakeInputDTO = makeFakeInputDTO();
    vi.spyOn(findSemesterByIdRepositorySpy, 'findById').mockResolvedValueOnce(
      null
    );

    await expect(sut.execute(fakeInputDTO)).rejects.toThrow(
      'Semester not found'
    );
  });

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
    ).mockResolvedValueOnce(
      new Semester({
        year: fakeInputDTO.year,
        semester: fakeInputDTO.semester,
        type: fakeInputDTO.type,
        startFirstStage: new Date(),
        endFirstStage: new Date(),
        startSecondStage: new Date(),
        endSecondStage: new Date()
      })
    );

    await expect(sut.execute(fakeInputDTO)).rejects.toThrow(
      'Already exists a semester for this year with the same semester and type'
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
    ).mockResolvedValueOnce(
      new Semester({
        year: fakeInputDTO.year,
        semester: 2,
        type: fakeInputDTO.type,
        startFirstStage: new Date(),
        endFirstStage: new Date(),
        startSecondStage: new Date(),
        endSecondStage: new Date()
      })
    );

    await expect(sut.execute(fakeInputDTO)).resolves.not.toThrow();
  });

  it('should not throw if find semester for same year but different type', async () => {
    const { sut, findSemesterByYearRepositorySpy } = makeSut();
    const fakeInputDTO = makeFakeInputDTO();
    vi.spyOn(
      findSemesterByYearRepositorySpy,
      'findByYear'
    ).mockResolvedValueOnce(
      new Semester({
        year: fakeInputDTO.year,
        semester: fakeInputDTO.semester,
        type: 'CONVENTIONAL',
        startFirstStage: new Date(),
        endFirstStage: new Date(),
        startSecondStage: new Date(),
        endSecondStage: new Date()
      })
    );

    await expect(sut.execute(fakeInputDTO)).resolves.not.toThrow();
  });

  it('should not throw if find semester for same year with same type and semester but different id', async () => {
    const { sut, findSemesterByYearRepositorySpy } = makeSut();
    const fakeInputDTO = makeFakeInputDTO();
    vi.spyOn(
      findSemesterByYearRepositorySpy,
      'findByYear'
    ).mockResolvedValueOnce(
      new Semester({
        id: fakeInputDTO.id,
        year: fakeInputDTO.year,
        semester: fakeInputDTO.semester,
        type: fakeInputDTO.type,
        startFirstStage: new Date(),
        endFirstStage: new Date(),
        startSecondStage: new Date(),
        endSecondStage: new Date()
      })
    );

    await expect(sut.execute(fakeInputDTO)).resolves.not.toThrow();
  });

  it('should call updateSemesterRepository with correct params', async () => {
    const { sut, updateSemesterRepositorySpy } = makeSut();
    const fakeInputDTO = makeFakeInputDTO();
    await sut.execute(fakeInputDTO);

    expect(updateSemesterRepositorySpy.update).toHaveBeenCalledTimes(1);
    expect(updateSemesterRepositorySpy.update).toHaveBeenCalledWith(
      expect.objectContaining({
        id: fakeInputDTO.id,
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

  it('should throw if updateSemesterRepository throws', async () => {
    const { sut, updateSemesterRepositorySpy } = makeSut();
    const fakeInputDTO = makeFakeInputDTO();
    vi.spyOn(updateSemesterRepositorySpy, 'update').mockImplementationOnce(
      () => {
        throw new Error('fake repo error');
      }
    );

    await expect(sut.execute(fakeInputDTO)).rejects.toThrow('fake repo error');
  });

  it('should return correct data on success', async () => {
    const { sut } = makeSut();
    const fakeInputDTO = makeFakeInputDTO();
    const result = await sut.execute(fakeInputDTO);

    expect(result).toEqual(
      expect.objectContaining({
        id: fakeInputDTO.id,
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
    expect(result.createdAt).not.toEqual(result.updatedAt);
    expect(result.updatedAt > result.createdAt).toBe(true);
  });
});
