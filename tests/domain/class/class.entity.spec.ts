import {
  Class,
  ClassEntityProps,
  ClassShift
} from '@/domain/class/entity/class';
import { Course } from '@/domain/course/entity/course';
import { Semester } from '@/domain/semester/entity/semester';
import { describe, expect, it } from 'vitest';
import { makeFakeCourse, makeFakeSemester } from '../../@shared/fakes';
import { fake } from '../../utils/fake-data-generator';

const makeFakeClassProps = (): ClassEntityProps => ({
  id: fake.uuid(),
  course: makeFakeCourse(),
  coursePeriod: 1,
  semester: makeFakeSemester(),
  shift: ClassShift.MORNING,
  createdAt: new Date(),
  updatedAt: new Date()
});

describe('Class Entity', () => {
  it('should create a new id, createdAt and updatedAt when they are not provided', () => {
    const fakeClassProps = makeFakeClassProps();
    fakeClassProps.id = undefined;
    fakeClassProps.createdAt = undefined;
    fakeClassProps.updatedAt = undefined;
    const user = new Class(fakeClassProps);
    expect(user.id).not.toBe('');
    expect(user.id).toBeDefined();
    expect(user.id).toBeTypeOf('string');
    expect(user.createdAt).toBeDefined();
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeDefined();
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should validate semester correctly', () => {
    const fakeClassProps = makeFakeClassProps();
    expect(() => {
      fakeClassProps.semester = undefined as unknown as Semester;
      new Class(fakeClassProps);
    }).toThrowError('semester is required');
    expect(() => {
      fakeClassProps.semester = {} as unknown as Semester;
      new Class(fakeClassProps);
    }).toThrowError('semester must be instance of Semester');
  });

  it('should validate shift correctly', () => {
    const fakeClassProps = makeFakeClassProps();
    expect(() => {
      fakeClassProps.shift = '' as ClassShift;
      new Class(fakeClassProps);
    }).toThrowError('shift must be one of MORNING, AFTERNOON or NIGHT');
    expect(() => {
      fakeClassProps.shift = 'invalid' as ClassShift;
      new Class(fakeClassProps);
    }).toThrowError('shift must be one of MORNING, AFTERNOON or NIGHT');
  });

  it('should validate course correctly', () => {
    const fakeClassProps = makeFakeClassProps();
    expect(() => {
      fakeClassProps.course = undefined as unknown as Course;
      new Class(fakeClassProps);
    }).toThrowError('course is required');
    expect(() => {
      fakeClassProps.course = {} as unknown as Course;
      new Class(fakeClassProps);
    }).toThrowError('course must be instance of Course');
  });

  it('should create a new Class when all data is valid', () => {
    const fakeClassProps = makeFakeClassProps();
    const courseClass = new Class(fakeClassProps);
    expect(courseClass.id).toBe(fakeClassProps.id);
    expect(courseClass.semester).toBe(fakeClassProps.semester);
    expect(courseClass.shift).toBe(fakeClassProps.shift);
    expect(courseClass.course).toBe(fakeClassProps.course);
    expect(courseClass.coursePeriod).toBe(fakeClassProps.coursePeriod);
    expect(courseClass.createdAt).toBe(fakeClassProps.createdAt);
    expect(courseClass.updatedAt).toBe(fakeClassProps.updatedAt);
  });
});
