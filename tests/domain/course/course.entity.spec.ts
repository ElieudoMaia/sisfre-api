import { Course, CourseEntityProps } from '@/domain/course/entity/course';
import { describe, expect, it } from 'vitest';
import { fake } from '../../utils/fake-data-generator';

const makeFakeCourseProps = (): CourseEntityProps => ({
  id: fake.uuid(),
  name: fake.name(),
  acronym: 'ABCD',
  coordinatorId: fake.uuid(),
  duration: 10,
  type: 'GRADUATION',
  createdAt: new Date(),
  updatedAt: new Date()
});

describe('Course Entity', () => {
  it('should create a new id, createdAt and updatedAt when they are not provided', () => {
    const fakeCourseProps = makeFakeCourseProps();
    fakeCourseProps.id = undefined;
    fakeCourseProps.createdAt = undefined;
    fakeCourseProps.updatedAt = undefined;
    const user = new Course(fakeCourseProps);
    expect(user.id).not.toBe('');
    expect(user.id).toBeDefined();
    expect(user.id).toBeTypeOf('string');
    expect(user.createdAt).toBeDefined();
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeDefined();
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should validate name correctly', () => {
    const fakeCourseProps = makeFakeCourseProps();
    expect(() => {
      fakeCourseProps.name = '';
      new Course(fakeCourseProps);
    }).toThrowError('name is required');
    expect(() => {
      fakeCourseProps.name = fake.random(256);
      new Course(fakeCourseProps);
    }).toThrowError('name must be less than 255 characters');
  });

  it('should validate type correctly', () => {
    const fakeCourseProps = makeFakeCourseProps();
    expect(() => {
      fakeCourseProps.type = '' as CourseEntityProps['type'];
      new Course(fakeCourseProps);
    }).toThrowError('type must be one of GRADUATION, INTEGRATED or TECHNICAL');
    expect(() => {
      fakeCourseProps.type = 'invalid' as CourseEntityProps['type'];
      new Course(fakeCourseProps);
    }).toThrowError('type must be one of GRADUATION, INTEGRATED or TECHNICAL');
  });

  it('should validate coordinatorId correctly', () => {
    const fakeCourseProps = makeFakeCourseProps();
    expect(() => {
      fakeCourseProps.coordinatorId = '';
      new Course(fakeCourseProps);
    }).toThrowError('coordinatorId is required');
  });

  it('should validate acronym correctly', () => {
    const fakeCourseProps = makeFakeCourseProps();
    expect(() => {
      fakeCourseProps.acronym = '';
      new Course(fakeCourseProps);
    }).toThrowError('acronym is required');
    expect(() => {
      fakeCourseProps.acronym = fake.random(11);
      new Course(fakeCourseProps);
    }).toThrowError('acronym must be less than 10 characters');
    expect(() => {
      fakeCourseProps.acronym = '1234';
      new Course(fakeCourseProps);
    }).toThrowError(
      'acronym must be in the format [A-Z] and have between 3 and 10 characters'
    );
    expect(() => {
      fakeCourseProps.acronym = 'asde';
      new Course(fakeCourseProps);
    }).toThrowError(
      'acronym must be in the format [A-Z] and have between 3 and 10 characters'
    );
    expect(() => {
      fakeCourseProps.acronym = 'ABC1D';
      new Course(fakeCourseProps);
    }).toThrowError(
      'acronym must be in the format [A-Z] and have between 3 and 10 characters'
    );
  });

  it('should validate duration correctly', () => {
    const fakeCourseProps = makeFakeCourseProps();
    expect(() => {
      fakeCourseProps.duration = undefined as unknown as number;
      new Course(fakeCourseProps);
    }).toThrowError('duration is required');
    expect(() => {
      fakeCourseProps.duration = 'abc' as unknown as number;
      new Course(fakeCourseProps);
    }).toThrowError('duration must be a number');
    expect(() => {
      fakeCourseProps.duration = 0;
      new Course(fakeCourseProps);
    }).toThrowError('duration must be greater than 0');
  });

  it('should create a new course when all data is valid', () => {
    const fakeCourseProps = makeFakeCourseProps();
    const course = new Course(fakeCourseProps);
    expect(course.id).toBe(fakeCourseProps.id);
    expect(course.name).toBe(fakeCourseProps.name);
    expect(course.acronym).toBe(fakeCourseProps.acronym);
    expect(course.coordinatorId).toBe(fakeCourseProps.coordinatorId);
    expect(course.duration).toBe(fakeCourseProps.duration);
    expect(course.type).toBe(fakeCourseProps.type);
    expect(course.createdAt).toBe(fakeCourseProps.createdAt);
    expect(course.updatedAt).toBe(fakeCourseProps.updatedAt);
  });
});
