import { CreateCourseUseCase } from '@/application/usecases/course/create/create-course.usecase';
import { CreateCourseUseCaseInputDTO } from '@/application/usecases/course/create/create-course.usecase.dto';
import { CheckCourseExistsByAcronymRepository } from '@/domain/course/repository/check-course-exists-by-acronym';
import { CheckCourseExistsByNameRepository } from '@/domain/course/repository/check-course-exists-by-name';
import { CreateCourseRepository } from '@/domain/course/repository/create-course';
import { FindUserByIdRepository } from '@/domain/user/repository/find-user-by-id';
import { describe, expect, it, vi } from 'vitest';
import { makeFakeUser } from '../../../@shared/fakes';
import { fake } from '../../../utils/fake-data-generator';

type SutTypes = {
  sut: CreateCourseUseCase;
  findUserByIdRepositorySpy: FindUserByIdRepository;
  checkCourseExistsByNameRepositorySpy: CheckCourseExistsByNameRepository;
  checkCourseExistsByAcronymRepositorySpy: CheckCourseExistsByAcronymRepository;
  createCourseRepositorySpy: CreateCourseRepository;
};

const makeSut = (): SutTypes => {
  const findUserByIdRepositorySpy = {
    findUserById: vi.fn().mockResolvedValue(makeFakeUser())
  };
  const checkCourseExistsByNameRepositorySpy = {
    checkCourseExistsByName: vi.fn().mockResolvedValue(undefined)
  };
  const checkCourseExistsByAcronymRepositorySpy = {
    checkCourseExistsByAcronym: vi.fn().mockResolvedValue(undefined)
  };
  const createCourseRepositorySpy = { createCourse: vi.fn() };
  const sut = new CreateCourseUseCase(
    findUserByIdRepositorySpy,
    checkCourseExistsByNameRepositorySpy,
    checkCourseExistsByAcronymRepositorySpy,
    createCourseRepositorySpy
  );

  return {
    sut,
    findUserByIdRepositorySpy,
    checkCourseExistsByNameRepositorySpy,
    checkCourseExistsByAcronymRepositorySpy,
    createCourseRepositorySpy
  };
};

const makeFakeInput = (): CreateCourseUseCaseInputDTO => ({
  name: fake.name(),
  type: 'GRADUATION',
  acronym: 'ABCD',
  coordinatorId: fake.uuid(),
  duration: 8
});

describe('Create Course', () => {
  it('should call findUserById with correct param', async () => {
    const { sut, findUserByIdRepositorySpy } = makeSut();
    const input = makeFakeInput();
    await sut.execute(input);
    expect(findUserByIdRepositorySpy.findUserById).toHaveBeenCalledWith(
      input.coordinatorId
    );
  });

  it('should throw if findUserByIdRepository throws', async () => {
    const { sut, findUserByIdRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(findUserByIdRepositorySpy, 'findUserById').mockRejectedValueOnce(
      new Error('Test throw')
    );
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow(new Error('Test throw'));
  });

  it('should throw if coordinator does not exist', async () => {
    const { sut, findUserByIdRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(findUserByIdRepositorySpy, 'findUserById').mockResolvedValueOnce(
      null
    );
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow(
      new Error('Coordinator does not exist')
    );
  });

  it('should throw if coordinator is not active', async () => {
    const { sut, findUserByIdRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(findUserByIdRepositorySpy, 'findUserById').mockResolvedValueOnce(
      makeFakeUser({ isActive: false })
    );
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow(
      new Error('Coordinator is not a active user')
    );
  });

  it('should throw if coordinator is already assigned to a course', async () => {
    const { sut, findUserByIdRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(findUserByIdRepositorySpy, 'findUserById').mockResolvedValueOnce(
      makeFakeUser({ role: 'COORDINATOR' })
    );
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow(
      new Error('Coordinator is already assigned to a course')
    );
  });

  it('should call checkCourseExistsByName with correct param', async () => {
    const { sut, checkCourseExistsByNameRepositorySpy } = makeSut();
    const input = makeFakeInput();
    await sut.execute(input);
    expect(
      checkCourseExistsByNameRepositorySpy.checkCourseExistsByName
    ).toHaveBeenCalledTimes(1);
    expect(
      checkCourseExistsByNameRepositorySpy.checkCourseExistsByName
    ).toHaveBeenCalledWith(input.name);
  });

  it('should throw if checkCourseExistsByNameRepository throws', async () => {
    const { sut, checkCourseExistsByNameRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(
      checkCourseExistsByNameRepositorySpy,
      'checkCourseExistsByName'
    ).mockRejectedValueOnce(new Error('Test throw'));
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow(new Error('Test throw'));
  });

  it('should throw if course name already exists', async () => {
    const { sut, checkCourseExistsByNameRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(
      checkCourseExistsByNameRepositorySpy,
      'checkCourseExistsByName'
    ).mockResolvedValueOnce({
      id: fake.uuid(),
      name: input.name,
      type: 'GRADUATION'
    });
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow(
      new Error('Already exists a course with this name')
    );
  });

  it('should call checkCourseExistsByAcronym with correct param', async () => {
    const { sut, checkCourseExistsByAcronymRepositorySpy } = makeSut();
    const input = makeFakeInput();
    await sut.execute(input);
    expect(
      checkCourseExistsByAcronymRepositorySpy.checkCourseExistsByAcronym
    ).toHaveBeenCalledTimes(1);
    expect(
      checkCourseExistsByAcronymRepositorySpy.checkCourseExistsByAcronym
    ).toHaveBeenCalledWith(input.acronym);
  });

  it('should throw if checkCourseExistsByAcronymRepository throws', async () => {
    const { sut, checkCourseExistsByAcronymRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(
      checkCourseExistsByAcronymRepositorySpy,
      'checkCourseExistsByAcronym'
    ).mockRejectedValueOnce(new Error('Test throw'));
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow(new Error('Test throw'));
  });

  it('should throw if course acronym already exists', async () => {
    const { sut, checkCourseExistsByAcronymRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(
      checkCourseExistsByAcronymRepositorySpy,
      'checkCourseExistsByAcronym'
    ).mockResolvedValueOnce({
      id: fake.uuid(),
      name: 'Test',
      type: 'GRADUATION'
    });
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow(
      new Error('Already exists a course with this acronym')
    );
  });

  it('should call createCourseRepository with correct param', async () => {
    const { sut, createCourseRepositorySpy } = makeSut();
    const input = makeFakeInput();
    await sut.execute(input);
    expect(createCourseRepositorySpy.createCourse).toHaveBeenCalledTimes(1);
    expect(createCourseRepositorySpy.createCourse).toHaveBeenCalledWith(
      expect.objectContaining({
        name: input.name,
        type: input.type,
        acronym: input.acronym,
        coordinatorId: input.coordinatorId,
        duration: input.duration
      })
    );
  });

  it('should throw if createCourseRepository throws', async () => {
    const { sut, createCourseRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(createCourseRepositorySpy, 'createCourse').mockRejectedValueOnce(
      new Error('Test throw')
    );
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow(new Error('Test throw'));
  });

  it('should return data on success', async () => {
    const { sut } = makeSut();
    const input = makeFakeInput();
    const result = await sut.execute(input);
    expect(result).toEqual({
      id: expect.any(String),
      name: input.name,
      type: input.type,
      acronym: input.acronym,
      coordinatorId: input.coordinatorId,
      duration: input.duration,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    });
  });
});
