import {
  ReferencedDayOfWeek,
  SchoolSatuday,
  SchoolSaturdayEntityProps
} from '@/domain/school-saturday/entity/school-saturday';
import { describe, expect, it } from 'vitest';
import { fake } from '../../utils/fake-data-generator';

const makeFakeSchoolSatudayProps = (): SchoolSaturdayEntityProps => ({
  id: fake.uuid(),
  referringTo: 'MONDAY',
  date: new Date(2023, 11, 16), // is a saturday
  createdAt: new Date(),
  updatedAt: new Date()
});

describe('SchoolSaturday Entity', () => {
  it('should create a new id, createdAt and updatedAt when they are not provided', () => {
    const fakeSchoolSatudayProps = makeFakeSchoolSatudayProps();
    fakeSchoolSatudayProps.id = undefined;
    const schoolSatuday = new SchoolSatuday(fakeSchoolSatudayProps);
    expect(schoolSatuday.id).toBeDefined();
    expect(schoolSatuday.id).toBeDefined();
    expect(schoolSatuday.id).toBeTypeOf('string');
    expect(schoolSatuday.createdAt).toBeDefined();
    expect(schoolSatuday.createdAt).toBeInstanceOf(Date);
    expect(schoolSatuday.updatedAt).toBeDefined();
    expect(schoolSatuday.updatedAt).toBeInstanceOf(Date);
  });

  it('should validate referringTo correctly', () => {
    const fakeSchoolSatudayProps = makeFakeSchoolSatudayProps();
    expect(() => {
      fakeSchoolSatudayProps.referringTo = 'invalid' as ReferencedDayOfWeek;
      new SchoolSatuday(fakeSchoolSatudayProps);
    }).toThrow(
      'referringTo must be one of: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY'
    );
  });

  it('should validate date correctly', () => {
    const fakeSchoolSatudayProps = makeFakeSchoolSatudayProps();
    expect(() => {
      fakeSchoolSatudayProps.date = new Date(2021, 0, 1); // is a friday
      new SchoolSatuday(fakeSchoolSatudayProps);
    }).toThrow('date must be a saturday');
    expect(() => {
      fakeSchoolSatudayProps.date = new Date(2020, 11, 31); // is a thursday
      new SchoolSatuday(fakeSchoolSatudayProps);
    }).toThrow('date must be a saturday');
    expect(() => {
      fakeSchoolSatudayProps.date = new Date(2020, 11, 30); // is a wednesday
      new SchoolSatuday(fakeSchoolSatudayProps);
    }).toThrow('date must be a saturday');
    expect(() => {
      fakeSchoolSatudayProps.date = new Date(2020, 11, 29); // is a tuesday
      new SchoolSatuday(fakeSchoolSatudayProps);
    }).toThrow('date must be a saturday');
    expect(() => {
      fakeSchoolSatudayProps.date = new Date(2020, 11, 28); // is a monday
      new SchoolSatuday(fakeSchoolSatudayProps);
    }).toThrow('date must be a saturday');
    expect(() => {
      fakeSchoolSatudayProps.date = new Date(2020, 11, 27); // is a sunday
      new SchoolSatuday(fakeSchoolSatudayProps);
    }).toThrow('date must be a saturday');
    expect(() => {
      fakeSchoolSatudayProps.date = '' as unknown as Date;
      new SchoolSatuday(fakeSchoolSatudayProps);
    }).toThrow('date must be a date');
    expect(() => {
      fakeSchoolSatudayProps.date = new Date(2020, 11, 26); // is a saturday but in the past
      new SchoolSatuday(fakeSchoolSatudayProps);
    }).toThrow('date must not be today or a past date');
  });
});
