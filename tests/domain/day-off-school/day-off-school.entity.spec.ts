import {
  DayOffSchool,
  DayOffSchoolEntityProps,
  DayOffSchoolType
} from '@/domain/day-off-school/entity/day-off-school';
import { describe, expect, it } from 'vitest';
import { fake } from '../../utils/fake-data-generator';

const makeFakeDayOffSchoolProps = (): DayOffSchoolEntityProps => ({
  id: fake.uuid(),
  description: fake.random(15),
  type: DayOffSchoolType.HOLIDAY,
  date: new Date(2024, 0, 26), // is a friday
  createdAt: new Date(),
  updatedAt: new Date()
});

describe('DayOffSchoolEntity', () => {
  it('should create a new id, createdAt and updatedAt when they are not provided', () => {
    const fakeSchoolSaturdayProps = makeFakeDayOffSchoolProps();
    fakeSchoolSaturdayProps.id = undefined;
    fakeSchoolSaturdayProps.createdAt = undefined;
    fakeSchoolSaturdayProps.updatedAt = undefined;

    const schoolSaturday = new DayOffSchool(fakeSchoolSaturdayProps);
    expect(schoolSaturday.id).toBeDefined();
    expect(schoolSaturday.id).toBeDefined();
    expect(schoolSaturday.id).toBeTypeOf('string');
    expect(schoolSaturday.createdAt).toBeDefined();
    expect(schoolSaturday.createdAt).toBeInstanceOf(Date);
    expect(schoolSaturday.updatedAt).toBeDefined();
    expect(schoolSaturday.updatedAt).toBeInstanceOf(Date);
  });

  it('should validate id correctly', () => {
    const fakeSchoolSaturdayProps = makeFakeDayOffSchoolProps();
    expect(() => {
      fakeSchoolSaturdayProps.id = 'invalid uuid';
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).toThrow('id must be a valid uuid');
  });

  it('should validate description correctly', () => {
    const fakeSchoolSaturdayProps = makeFakeDayOffSchoolProps();
    expect(() => {
      fakeSchoolSaturdayProps.description = 'a';
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).toThrow('description must be at least 3 characters');
    expect(() => {
      fakeSchoolSaturdayProps.description = fake.random(256);
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).toThrow('description must be at most 255 characters');
    expect(() => {
      fakeSchoolSaturdayProps.description = undefined as unknown as string;
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).toThrow('description is required');
  });

  it('should validate type correctly', () => {
    const fakeSchoolSaturdayProps = makeFakeDayOffSchoolProps();
    expect(() => {
      fakeSchoolSaturdayProps.type = 'invalid type' as DayOffSchoolType;
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).toThrow(
      `type must be one of: ${Object.values(DayOffSchoolType).join(', ')}`
    );
    expect(() => {
      fakeSchoolSaturdayProps.type = undefined as unknown as DayOffSchoolType;
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).toThrow('type is required');
  });

  it('should validate date correctly', () => {
    const fakeSchoolSaturdayProps = makeFakeDayOffSchoolProps();
    expect(() => {
      fakeSchoolSaturdayProps.date = new Date(2024, 0, 28); // is a sunday
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).toThrow('date must not be a weekend');
    expect(() => {
      fakeSchoolSaturdayProps.date = new Date(2024, 0, 27); // is a saturday
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).toThrow('date must not be a weekend');
    expect(() => {
      fakeSchoolSaturdayProps.date = undefined as unknown as Date;
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).toThrow('date is required');
    expect(() => {
      fakeSchoolSaturdayProps.date = new Date(2024, 0, 29); // is a monday
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).not.toThrow();
  });

  it('should validate createdAt correctly', () => {
    const fakeSchoolSaturdayProps = makeFakeDayOffSchoolProps();
    expect(() => {
      fakeSchoolSaturdayProps.createdAt = 'invalid date' as unknown as Date;
      fakeSchoolSaturdayProps.updatedAt = new Date(2024, 0, 29);
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).toThrow('createdAt must be a date');
    expect(() => {
      fakeSchoolSaturdayProps.createdAt = undefined as unknown as Date;
      fakeSchoolSaturdayProps.updatedAt = new Date(2024, 0, 29);
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).not.toThrow();
  });

  it('should validate updatedAt correctly', () => {
    const fakeSchoolSaturdayProps = makeFakeDayOffSchoolProps();
    expect(() => {
      fakeSchoolSaturdayProps.createdAt = new Date(2024, 0, 26);
      fakeSchoolSaturdayProps.updatedAt = 'invalid date' as unknown as Date;
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).toThrow('updatedAt must be a date');
    expect(() => {
      fakeSchoolSaturdayProps.createdAt = new Date(2024, 0, 30);
      fakeSchoolSaturdayProps.updatedAt = new Date(2024, 0, 29);
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).toThrow('updatedAt must be after than or equal to createdAt');
    expect(() => {
      fakeSchoolSaturdayProps.createdAt = new Date(2024, 0, 26);
      fakeSchoolSaturdayProps.updatedAt = undefined as unknown as Date;
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).not.toThrow();
  });
});
