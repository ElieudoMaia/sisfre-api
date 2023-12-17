import {
  ReferencedDayOfWeek,
  SchoolSaturday,
  SchoolSaturdayEntityProps
} from '@/domain/school-saturday/entity/school-saturday';
import { describe, expect, it } from 'vitest';
import { fake } from '../../utils/fake-data-generator';

const makeFakeSchoolSaturdayProps = (): SchoolSaturdayEntityProps => ({
  id: fake.uuid(),
  referringTo: 'MONDAY',
  date: new Date(2101, 0, 1), // is a saturday
  createdAt: new Date(),
  updatedAt: new Date()
});

describe('SchoolSaturday Entity', () => {
  it('should create a new id, createdAt and updatedAt when they are not provided', () => {
    const fakeSchoolSaturdayProps = makeFakeSchoolSaturdayProps();
    fakeSchoolSaturdayProps.id = undefined;
    const schoolSaturday = new SchoolSaturday(fakeSchoolSaturdayProps);
    expect(schoolSaturday.id).toBeDefined();
    expect(schoolSaturday.id).toBeDefined();
    expect(schoolSaturday.id).toBeTypeOf('string');
    expect(schoolSaturday.createdAt).toBeDefined();
    expect(schoolSaturday.createdAt).toBeInstanceOf(Date);
    expect(schoolSaturday.updatedAt).toBeDefined();
    expect(schoolSaturday.updatedAt).toBeInstanceOf(Date);
  });

  it('should validate referringTo correctly', () => {
    const fakeSchoolSaturdayProps = makeFakeSchoolSaturdayProps();
    expect(() => {
      fakeSchoolSaturdayProps.referringTo = 'invalid' as ReferencedDayOfWeek;
      new SchoolSaturday(fakeSchoolSaturdayProps);
    }).toThrow(
      'referringTo must be one of: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY'
    );
  });

  it('should validate date correctly', () => {
    const fakeSchoolSaturdayProps = makeFakeSchoolSaturdayProps();
    expect(() => {
      fakeSchoolSaturdayProps.date = new Date(2021, 0, 1); // is a friday
      new SchoolSaturday(fakeSchoolSaturdayProps);
    }).toThrow('date must be a saturday');
    expect(() => {
      fakeSchoolSaturdayProps.date = new Date(2020, 11, 31); // is a thursday
      new SchoolSaturday(fakeSchoolSaturdayProps);
    }).toThrow('date must be a saturday');
    expect(() => {
      fakeSchoolSaturdayProps.date = new Date(2020, 11, 30); // is a wednesday
      new SchoolSaturday(fakeSchoolSaturdayProps);
    }).toThrow('date must be a saturday');
    expect(() => {
      fakeSchoolSaturdayProps.date = new Date(2020, 11, 29); // is a tuesday
      new SchoolSaturday(fakeSchoolSaturdayProps);
    }).toThrow('date must be a saturday');
    expect(() => {
      fakeSchoolSaturdayProps.date = new Date(2020, 11, 28); // is a monday
      new SchoolSaturday(fakeSchoolSaturdayProps);
    }).toThrow('date must be a saturday');
    expect(() => {
      fakeSchoolSaturdayProps.date = new Date(2020, 11, 27); // is a sunday
      new SchoolSaturday(fakeSchoolSaturdayProps);
    }).toThrow('date must be a saturday');
    expect(() => {
      fakeSchoolSaturdayProps.date = '' as unknown as Date;
      new SchoolSaturday(fakeSchoolSaturdayProps);
    }).toThrow();
    expect(() => {
      fakeSchoolSaturdayProps.date = new Date(2020, 11, 26); // is a saturday but in the past
      new SchoolSaturday(fakeSchoolSaturdayProps);
    }).toThrow('date must not be today or a past date');
  });
});
