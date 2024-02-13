import { UpdateClassUseCase } from '@/application/usecases/class/update/update-class.usecase';
import { UpdateClassUseCaseInputDTO } from '@/application/usecases/class/update/update-class.usecase.dto';
import { ClassShift } from '@/domain/class/entity/class';
import { FindClassByIdRepository } from '@/domain/class/repository/find-class-by-id';
import { UpdateClassRepository } from '@/domain/class/repository/update-class';
import { Course } from '@/domain/course/entity/course';
import { FindCourseByIdRepository } from '@/domain/course/repository/find-course-by-id';
import { Semester } from '@/domain/semester/entity/semester';
import { FindSemesterByIdRepository } from '@/domain/semester/repository/find-semester-by-id';
import { describe, expect, it, vi } from 'vitest';
import {
  makeFakeClass,
  makeFakeCourse,
  makeFakeSemester
} from '../../../@shared/fakes';
import { fake } from '../../../utils/fake-data-generator';

const courseDuration = 8;
const classId = fake.uuid();
const semesterId = fake.uuid();
const courseId = fake.uuid();

type SutTypes = {
  sut: UpdateClassUseCase;
  findClassByIdRepositorySpy: FindClassByIdRepository;
  findSemesterByIdRepositorySpy: FindSemesterByIdRepository;
  findCourseByIdRepositorySpy: FindCourseByIdRepository;
  updateClassRepositorySpy: UpdateClassRepository;
};

const makeSut = (): SutTypes => {
  const findClassByIdRepositorySpy = {
    findById: vi
      .fn()
      .mockResolvedValue(makeFakeClass({ id: classId, courseId, semesterId }))
  };
  const findSemesterByIdRepositorySpy = {
    findById: vi.fn().mockResolvedValue(makeFakeSemester({ id: semesterId }))
  };
  const findCourseByIdRepositorySpy = {
    findCourseById: vi
      .fn()
      .mockResolvedValue(
        makeFakeCourse({ id: courseId, duration: courseDuration })
      )
  };
  const updateClassRepositorySpy = { update: vi.fn() };

  const sut = new UpdateClassUseCase(
    findClassByIdRepositorySpy,
    findSemesterByIdRepositorySpy,
    findCourseByIdRepositorySpy,
    updateClassRepositorySpy
  );

  return {
    sut,
    findClassByIdRepositorySpy,
    findSemesterByIdRepositorySpy,
    findCourseByIdRepositorySpy,
    updateClassRepositorySpy
  };
};

const makeFakeInput = (): UpdateClassUseCaseInputDTO => ({
  id: classId,
  courseId,
  semesterId,
  coursePeriod: 1,
  shift: ClassShift.MORNING
});

describe('UpdateClassUseCase', () => {
  it('should call findClassByIdRepository with correct param', async () => {
    const { sut, findClassByIdRepositorySpy } = makeSut();
    const input = makeFakeInput();
    await sut.execute(input);
    expect(findClassByIdRepositorySpy.findById).toHaveBeenCalledTimes(1);
    expect(findClassByIdRepositorySpy.findById).toHaveBeenCalledWith(input.id);
  });

  it('should throw if findClassByIdRepository throws', async () => {
    const { sut, findClassByIdRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(findClassByIdRepositorySpy, 'findById').mockRejectedValueOnce(
      new Error('Test throw')
    );
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow(new Error('Test throw'));
  });

  it('should throw if class does not exist', async () => {
    const { sut, findClassByIdRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(findClassByIdRepositorySpy, 'findById').mockResolvedValueOnce(
      null
    );
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow(new Error('Class not found'));
  });

  it('should call findSemesterById with correct param', async () => {
    const { sut, findSemesterByIdRepositorySpy } = makeSut();
    const input = makeFakeInput();
    await sut.execute(input);
    expect(findSemesterByIdRepositorySpy.findById).toHaveBeenCalledWith(
      input.semesterId
    );
  });

  it('should throw if findSemesterById throws', async () => {
    const { sut, findSemesterByIdRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(findSemesterByIdRepositorySpy, 'findById').mockRejectedValueOnce(
      new Error('Test throw')
    );
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow(new Error('Test throw'));
  });

  it('should throw if semester does not exist', async () => {
    const { sut, findSemesterByIdRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(findSemesterByIdRepositorySpy, 'findById').mockResolvedValueOnce(
      null
    );
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow(new Error('Semester does not exist'));
  });

  it('should call findCourseByIdRepository with correct param', async () => {
    const { sut, findCourseByIdRepositorySpy } = makeSut();
    const input = makeFakeInput();
    await sut.execute(input);
    expect(findCourseByIdRepositorySpy.findCourseById).toHaveBeenCalledTimes(1);
    expect(findCourseByIdRepositorySpy.findCourseById).toHaveBeenCalledWith(
      input.courseId
    );
  });

  it('should throw if findCourseByIdRepository throws', async () => {
    const { sut, findCourseByIdRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(
      findCourseByIdRepositorySpy,
      'findCourseById'
    ).mockRejectedValueOnce(new Error('Test throw'));
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow(new Error('Test throw'));
  });

  it('should throw if course does not exists', async () => {
    const { sut, findCourseByIdRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(
      findCourseByIdRepositorySpy,
      'findCourseById'
    ).mockResolvedValueOnce(undefined);
    const promise = sut.execute(input);
    await expect(promise).rejects.toThrow(new Error('Course does not exist'));
  });

  it('should thow if the coursePeriod is more than course semester', async () => {
    const { sut } = makeSut();
    const input = makeFakeInput();
    input.coursePeriod = 100;
    const promise = sut.execute(input);
    expect(promise).rejects.toThrow(
      `Invalid course period: it must be less than or equal to ${courseDuration}`
    );
  });

  it('should not thow if the coursePeriod a valid according with course duration', async () => {
    const { sut } = makeSut();
    const input = makeFakeInput();
    input.coursePeriod = 8;
    const promise = sut.execute(input);
    expect(promise).resolves.not.toThrow();
    input.coursePeriod = 1;
    const promise2 = sut.execute(input);
    expect(promise2).resolves.not.toThrow();
    input.coursePeriod = 5;
    const promise3 = sut.execute(input);
    expect(promise3).resolves.not.toThrow();
  });

  it('should call updateClassRepository with correct param', async () => {
    const { sut, updateClassRepositorySpy } = makeSut();
    const input = makeFakeInput();
    await sut.execute(input);
    expect(updateClassRepositorySpy.update).toHaveBeenCalledTimes(1);
    expect(updateClassRepositorySpy.update).toHaveBeenCalledWith(
      expect.objectContaining({
        id: input.id,
        shift: input.shift,
        coursePeriod: input.coursePeriod,
        semester: expect.any(Semester),
        course: expect.any(Course),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      })
    );
  });

  it('should throw if updateClassRepository throws', async () => {
    const { sut, updateClassRepositorySpy } = makeSut();
    const input = makeFakeInput();
    vi.spyOn(updateClassRepositorySpy, 'update').mockRejectedValueOnce(
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
      shift: input.shift,
      courseId: input.courseId,
      semesterId: input.semesterId,
      coursePeriod: input.coursePeriod,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    });
  });
});
