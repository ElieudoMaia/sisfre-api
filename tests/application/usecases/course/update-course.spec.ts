import { UpdateCourseUsecase } from '@/application/usecases/course/update/update-course.usecase';
import { UpdateCourseUseCaseInputDTO } from '@/application/usecases/course/update/update-course.usecase.dto';
import { NotFoundError } from '@/domain/@shared/error/not-found.error';
import { CheckCourseExistsByAcronymRepository } from '@/domain/course/repository/check-course-exists-by-acronym';
import { CheckCourseExistsByNameRepository } from '@/domain/course/repository/check-course-exists-by-name';
import { FindCourseByIdRepository } from '@/domain/course/repository/find-course-by-id';
import { UpdateCourseRepository } from '@/domain/course/repository/update-course';
import { FindUserByIdRepository } from '@/domain/user/repository/find-user-by-id';
import { describe, expect, it, vi } from 'vitest';
import { makeFakeCourse, makeFakeUser } from '../../../@shared/fakes';
import { fake } from '../../../utils/fake-data-generator';

const courseId = fake.uuid();
const coordinatorId = fake.uuid();

type SutTypes = {
  sut: UpdateCourseUsecase;
  findCourseByIdRepositorySpy: FindCourseByIdRepository;
  findUserByIdRepositorySpy: FindUserByIdRepository;
  checkCourseExistsByNameRepositorySpy: CheckCourseExistsByNameRepository;
  checkCourseExistsByAcronymRepositorySpy: CheckCourseExistsByAcronymRepository;
  updateCourseRepositorySpy: UpdateCourseRepository;
};

const makeSut = (): SutTypes => {
  const findCourseByIdRepositorySpy = {
    findCourseById: vi.fn().mockResolvedValue(makeFakeCourse({ id: courseId }))
  };
  const findUserByIdRepositorySpy = {
    findUserById: vi.fn().mockResolvedValue(makeFakeUser({ id: coordinatorId }))
  };
  const checkCourseExistsByNameRepositorySpy = {
    checkCourseExistsByName: vi.fn().mockResolvedValue(undefined)
  };
  const checkCourseExistsByAcronymRepositorySpy = {
    checkCourseExistsByAcronym: vi.fn().mockResolvedValue(undefined)
  };
  const updateCourseRepositorySpy = { updateCourse: vi.fn() };
  const sut = new UpdateCourseUsecase(
    findCourseByIdRepositorySpy,
    findUserByIdRepositorySpy,
    checkCourseExistsByNameRepositorySpy,
    checkCourseExistsByAcronymRepositorySpy,
    updateCourseRepositorySpy
  );

  return {
    sut,
    findCourseByIdRepositorySpy,
    findUserByIdRepositorySpy,
    checkCourseExistsByNameRepositorySpy,
    checkCourseExistsByAcronymRepositorySpy,
    updateCourseRepositorySpy
  };
};

const makeFakeInput = (): UpdateCourseUseCaseInputDTO => ({
  id: fake.uuid(),
  name: fake.name(),
  acronym: 'ABCD',
  coordinatorId,
  duration: 8,
  type: 'GRADUATION'
});

describe('UpdateCourseUseCase', () => {
  it('should call findCourseByIdRepository with correct param', async () => {
    const { sut, findCourseByIdRepositorySpy } = makeSut();
    const input = makeFakeInput();
    await sut.execute(input);
    expect(findCourseByIdRepositorySpy.findCourseById).toHaveBeenCalledWith(
      input.id
    );
  });

  it('should throw if findCourseByIdRepository throws', async () => {
    const { sut, findCourseByIdRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(
      findCourseByIdRepositorySpy,
      'findCourseById'
    ).mockRejectedValueOnce(new Error('mocked error'));
    await expect(sut.execute(input)).rejects.toThrow(new Error('mocked error'));
  });

  it('should throw if course does not exist', async () => {
    const { sut, findCourseByIdRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(
      findCourseByIdRepositorySpy,
      'findCourseById'
    ).mockResolvedValueOnce(undefined);
    await expect(sut.execute(input)).rejects.toThrow(
      new NotFoundError('Course not found')
    );
  });

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
      new Error('mocked error')
    );
    await expect(sut.execute(input)).rejects.toThrow(new Error('mocked error'));
  });

  it('should throw if coordinator does not exist', async () => {
    const { sut, findUserByIdRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(findUserByIdRepositorySpy, 'findUserById').mockResolvedValueOnce(
      null
    );
    await expect(sut.execute(input)).rejects.toThrow(
      new Error('Coordinator does not exist')
    );
  });

  it('should throw if coordinator is not active', async () => {
    const { sut, findUserByIdRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(findUserByIdRepositorySpy, 'findUserById').mockResolvedValueOnce(
      makeFakeUser({ isActive: false })
    );
    await expect(sut.execute(input)).rejects.toThrow(
      new Error('Coordinator is not a active user')
    );
  });

  it('should throw if coordinator is already assigned to a course', async () => {
    const { sut, findUserByIdRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(findUserByIdRepositorySpy, 'findUserById').mockResolvedValueOnce(
      makeFakeUser({ role: 'COORDINATOR' })
    );
    await expect(sut.execute(input)).rejects.toThrow(
      new Error('Coordinator is already assigned to a course')
    );
  });

  it('should not throw if coordinator is assigned to the same course', async () => {
    const { sut, findUserByIdRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(findUserByIdRepositorySpy, 'findUserById').mockResolvedValueOnce(
      makeFakeUser({ id: input.coordinatorId })
    );
    await expect(sut.execute(input)).resolves.not.toThrow();
  });

  it('should call checkCourseExistsByNameRepository with correct param', async () => {
    const { sut, checkCourseExistsByNameRepositorySpy } = makeSut();
    const input = makeFakeInput();
    await sut.execute(input);
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
    ).mockRejectedValueOnce(new Error('mocked error'));
    await expect(sut.execute(input)).rejects.toThrow(new Error('mocked error'));
  });

  it('should throw if course with same name already exists', async () => {
    const { sut, checkCourseExistsByNameRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(
      checkCourseExistsByNameRepositorySpy,
      'checkCourseExistsByName'
    ).mockResolvedValueOnce(makeFakeCourse());
    await expect(sut.execute(input)).rejects.toThrow(
      new Error('Already exists a course with this name')
    );
  });

  it('should not throw if course with same name already exists but is the same course', async () => {
    const { sut, checkCourseExistsByNameRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(
      checkCourseExistsByNameRepositorySpy,
      'checkCourseExistsByName'
    ).mockResolvedValueOnce(makeFakeCourse({ id: input.id }));
    await expect(sut.execute(input)).resolves.not.toThrow();
  });

  it('should call checkCourseExistsByAcronymRepository with correct param', async () => {
    const { sut, checkCourseExistsByAcronymRepositorySpy } = makeSut();
    const input = makeFakeInput();
    await sut.execute(input);
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
    ).mockRejectedValueOnce(new Error('mocked error'));
    await expect(sut.execute(input)).rejects.toThrow(new Error('mocked error'));
  });

  it('should throw if course with same acronym already exists', async () => {
    const { sut, checkCourseExistsByAcronymRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(
      checkCourseExistsByAcronymRepositorySpy,
      'checkCourseExistsByAcronym'
    ).mockResolvedValueOnce(makeFakeCourse());
    await expect(sut.execute(input)).rejects.toThrow(
      new Error('Already exists a course with this acronym')
    );
  });

  it('should not throw if course with same acronym already exists but is the same course', async () => {
    const { sut, checkCourseExistsByAcronymRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(
      checkCourseExistsByAcronymRepositorySpy,
      'checkCourseExistsByAcronym'
    ).mockResolvedValueOnce(makeFakeCourse({ id: input.id }));
    await expect(sut.execute(input)).resolves.not.toThrow();
  });

  it('should call updateCourseRepository with correct params', async () => {
    const { sut, updateCourseRepositorySpy } = makeSut();
    const input = makeFakeInput();
    await sut.execute(input);
    expect(updateCourseRepositorySpy.updateCourse).toHaveBeenCalledTimes(1);
    expect(updateCourseRepositorySpy.updateCourse).toHaveBeenCalledWith(
      expect.objectContaining({
        id: courseId,
        name: input.name,
        acronym: input.acronym,
        coordinatorId: input.coordinatorId,
        duration: input.duration,
        type: input.type
      })
    );
  });

  it('should throw if updateCourseRepository throws', async () => {
    const { sut, updateCourseRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(updateCourseRepositorySpy, 'updateCourse').mockRejectedValueOnce(
      new Error('mocked error')
    );
    await expect(sut.execute(input)).rejects.toThrow(new Error('mocked error'));
  });

  it('should not throw if updateCourseRepository succeeds', async () => {
    const { sut } = makeSut();
    const input = makeFakeInput();
    await expect(sut.execute(input)).resolves.not.toThrow();
  });
});
