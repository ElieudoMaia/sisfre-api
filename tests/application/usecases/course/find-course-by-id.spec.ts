import { FindCourseByIdUseCase } from '@/application/usecases/course/find-by-id/find-course-by-id.usecase';
import { FindCourseByIdRepository } from '@/domain/course/repository/find-course-by-id';
import { describe, expect, it, vi } from 'vitest';
import { makeFakeCourse, makeFakeUser } from '../../../@shared/fakes';
import { fake } from '../../../utils/fake-data-generator';

const userId = fake.uuid();
const courseId = fake.uuid();

const getFakeCourse = () => {
  const user = makeFakeUser({ id: userId });
  const course = makeFakeCourse({ id: courseId, coordinatorId: userId });
  course.coordinator = user;
  return course;
};

type SutTypes = {
  sut: FindCourseByIdUseCase;
  findCourseByIdRepositorySpy: FindCourseByIdRepository;
};

const makeSut = (): SutTypes => {
  const findCourseByIdRepositorySpy = {
    findCourseById: vi.fn().mockResolvedValue(getFakeCourse())
  };
  const sut = new FindCourseByIdUseCase(findCourseByIdRepositorySpy);
  return {
    sut,
    findCourseByIdRepositorySpy
  };
};

describe('FindCourseByIdUseCase', () => {
  it('should call findCourseByIdRepository with correct params', async () => {
    const { sut, findCourseByIdRepositorySpy } = makeSut();
    await sut.execute({ id: courseId });
    expect(findCourseByIdRepositorySpy.findCourseById).toHaveBeenCalledWith(
      courseId
    );
  });

  it('should throw if findCourseByIdRepository throws', async () => {
    const { sut, findCourseByIdRepositorySpy } = makeSut();
    vi.spyOn(
      findCourseByIdRepositorySpy,
      'findCourseById'
    ).mockRejectedValueOnce('fake error');
    await expect(sut.execute({ id: courseId })).rejects.toThrow('fake error');
  });

  it('should throw if findCourseByIdRepository returns null', async () => {
    const { sut, findCourseByIdRepositorySpy } = makeSut();
    vi.spyOn(
      findCourseByIdRepositorySpy,
      'findCourseById'
    ).mockResolvedValueOnce(undefined);
    await expect(sut.execute({ id: courseId })).rejects.toThrow(
      'Course not found'
    );
  });

  it('should return a course if findCourseByIdRepository returns a course', async () => {
    const { sut } = makeSut();
    const course = await sut.execute({ id: courseId });
    expect(course).toEqual(
      expect.objectContaining({
        id: courseId
      })
    );
  });
});
