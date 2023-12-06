import { ListCoursesUseCase } from '@/application/usecases/course/list/list-courses.usecase';
import { Course } from '@/domain/course/entity/course';
import { ListCoursesRepository } from '@/domain/course/repository/list-courses';
import { User } from '@/domain/user/entity/user';
import { describe, expect, it, vi } from 'vitest';
import { fake } from '../../../utils/fake-data-generator';

const makeFakeUser = ({ id = fake.uuid() }) => {
  return new User({
    id,
    name: fake.name(),
    email: fake.email(),
    password: fake.password(),
    nameAbbreviation: 'ABCD',
    isActive: true,
    role: 'COORDINATOR',
    createdAt: new Date(),
    updatedAt: new Date()
  });
};

const makeFakeCourse = (): Course => {
  const coordinatorId = fake.uuid();
  const course = new Course({
    id: 'any_id',
    name: 'any_name',
    type: 'GRADUATION',
    acronym: 'CRS',
    coordinatorId,
    duration: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  course.coordinator = makeFakeUser({ id: coordinatorId });
  return course;
};

const makeListCoursesRepositorySpy = (): ListCoursesRepository => ({
  findAll: vi.fn().mockResolvedValue({
    courses: [],
    quantity: 0
  })
});

export const makeSut = () => {
  const listCoursesRepositorySpy = makeListCoursesRepositorySpy();
  const sut = new ListCoursesUseCase(listCoursesRepositorySpy);
  return { sut, listCoursesRepositorySpy };
};

describe('ListCoursesUseCase', () => {
  it('should call listCoursesRepository with correct params', async () => {
    const { sut, listCoursesRepositorySpy } = makeSut();
    await sut.execute({});
    expect(listCoursesRepositorySpy.findAll).toHaveBeenCalledWith({});
    await sut.execute({ pageNumber: 1 });
    expect(listCoursesRepositorySpy.findAll).toHaveBeenCalledWith({
      pageNumber: 1
    });
    await sut.execute({ pageSize: 10 });
    expect(listCoursesRepositorySpy.findAll).toHaveBeenCalledWith({
      pageSize: 10
    });
    await sut.execute({ pageNumber: 1, pageSize: 10 });
    expect(listCoursesRepositorySpy.findAll).toHaveBeenCalledWith({
      pageNumber: 1,
      pageSize: 10
    });
  });

  it('should throw if listCoursesRepository throws', async () => {
    const { sut, listCoursesRepositorySpy } = makeSut();
    vi.spyOn(listCoursesRepositorySpy, 'findAll').mockRejectedValueOnce(
      new Error('repo error')
    );
    await expect(sut.execute({})).rejects.toThrow('repo error');
  });

  it('should return correct data when there is no data', async () => {
    const { sut } = makeSut();
    const result = await sut.execute({});
    expect(result).toEqual({
      courses: [],
      quantity: 0,
      pageNumber: 1,
      pageSize: undefined
    });
  });

  it('should return the correct data', async () => {
    const { sut, listCoursesRepositorySpy } = makeSut();
    const fakeCourse1 = makeFakeCourse();
    const fakeCourse2 = makeFakeCourse();
    vi.spyOn(listCoursesRepositorySpy, 'findAll').mockResolvedValueOnce({
      courses: [fakeCourse1, fakeCourse2],
      quantity: 2
    });
    const result = await sut.execute({});
    expect(result.courses[0]).toEqual(
      expect.objectContaining({
        id: fakeCourse1.id,
        name: fakeCourse1.name,
        type: fakeCourse1.type,
        acronym: fakeCourse1.acronym,
        duration: fakeCourse1.duration,
        coordinator: expect.objectContaining({
          id: fakeCourse1.coordinatorId
        })
      })
    );
    expect(result.courses[1]).toEqual(
      expect.objectContaining({
        id: fakeCourse2.id,
        name: fakeCourse2.name,
        type: fakeCourse2.type,
        acronym: fakeCourse2.acronym,
        duration: fakeCourse2.duration,
        coordinator: expect.objectContaining({
          id: fakeCourse2.coordinatorId
        })
      })
    );
  });
});
