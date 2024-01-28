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
  dateBegin: new Date(2024, 0, 26),
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

  it('should set dateEnd only when type is RECESS or VOCATION', () => {
    const fakeSchoolSaturdayProps = makeFakeDayOffSchoolProps();
    fakeSchoolSaturdayProps.dateEnd = new Date(2024, 0, 26);

    fakeSchoolSaturdayProps.type = DayOffSchoolType.HOLIDAY;
    const schoolSaturday = new DayOffSchool(fakeSchoolSaturdayProps);
    expect(schoolSaturday.dateEnd).toBeUndefined();

    fakeSchoolSaturdayProps.type = DayOffSchoolType.RECESS;
    const schoolSaturday2 = new DayOffSchool(fakeSchoolSaturdayProps);
    expect(schoolSaturday2.dateEnd).toBeDefined();
    expect(schoolSaturday2.dateEnd).toBeInstanceOf(Date);
    expect(schoolSaturday2.dateEnd).toEqual(schoolSaturday2.dateBegin);

    fakeSchoolSaturdayProps.type = DayOffSchoolType.VOCATION;
    const schoolSaturday3 = new DayOffSchool(fakeSchoolSaturdayProps);
    expect(schoolSaturday3.dateEnd).toBeDefined();
    expect(schoolSaturday3.dateEnd).toBeInstanceOf(Date);
    expect(schoolSaturday3.dateEnd).toEqual(schoolSaturday3.dateBegin);
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

  it('should throw when dateBegin is missing', () => {
    const fakeSchoolSaturdayProps = makeFakeDayOffSchoolProps();
    expect(() => {
      fakeSchoolSaturdayProps.dateBegin = undefined as unknown as Date;
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).toThrow('dateBegin is required');
  });

  it('should throw when type is HOLIDAY and dateBegin is a sunday', () => {
    expect(() => {
      const fakeSchoolSaturdayProps = makeFakeDayOffSchoolProps();
      fakeSchoolSaturdayProps.type = DayOffSchoolType.HOLIDAY;
      fakeSchoolSaturdayProps.dateBegin = new Date(2024, 0, 28); // is a sunday
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).toThrow('dateBegin must not be a sunday when type is HOLIDAY');
  });

  it('should not throw when dateBegin is a sunday and type is RECESS or VOCATION', () => {
    expect(() => {
      const fakeSchoolSaturdayProps = makeFakeDayOffSchoolProps();
      fakeSchoolSaturdayProps.type = DayOffSchoolType.RECESS;
      fakeSchoolSaturdayProps.dateBegin = new Date(2024, 0, 28); // is a sunday
      fakeSchoolSaturdayProps.dateEnd = new Date(2024, 0, 29);
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).not.toThrow();
    expect(() => {
      const fakeSchoolSaturdayProps = makeFakeDayOffSchoolProps();
      fakeSchoolSaturdayProps.type = DayOffSchoolType.VOCATION;
      fakeSchoolSaturdayProps.dateBegin = new Date(2024, 0, 28); // is a sunday
      fakeSchoolSaturdayProps.dateEnd = new Date(2024, 0, 29);
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).not.toThrow();
  });

  it('should not throw when type is HOLIDAY and dateBegin is not a sunday', () => {
    expect(() => {
      const fakeSchoolSaturdayProps = makeFakeDayOffSchoolProps();
      fakeSchoolSaturdayProps.dateBegin = new Date(2024, 0, 29); // is a monday
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).not.toThrow();
    expect(() => {
      const fakeSchoolSaturdayProps = makeFakeDayOffSchoolProps();
      fakeSchoolSaturdayProps.dateBegin = new Date(2024, 0, 27); // is a saturday
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).not.toThrow();
  });

  it('should not throw if type is HOLIDAY and dateEnd is undefined', () => {
    expect(() => {
      const fakeSchoolSaturdayProps = makeFakeDayOffSchoolProps();
      fakeSchoolSaturdayProps.type = DayOffSchoolType.HOLIDAY;
      fakeSchoolSaturdayProps.dateEnd = undefined;
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).not.toThrow();
  });

  it('should throw when dateEnd is before dateBegin', () => {
    expect(() => {
      const fakeDayOffSchoolProps = makeFakeDayOffSchoolProps();
      fakeDayOffSchoolProps.type = DayOffSchoolType.RECESS;
      fakeDayOffSchoolProps.dateBegin = new Date(2024, 0, 26);
      fakeDayOffSchoolProps.dateEnd = new Date(2024, 0, 25);
      new DayOffSchool(fakeDayOffSchoolProps);
    }).toThrow('dateEnd must be after than or equal to dateBegin');
  });

  it('should throw if type is RECESS or VOCATION and dateEnd is undefined', () => {
    expect(() => {
      const fakeSchoolSaturdayProps = makeFakeDayOffSchoolProps();
      fakeSchoolSaturdayProps.type = DayOffSchoolType.RECESS;
      fakeSchoolSaturdayProps.dateEnd = undefined;
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).toThrow('dateEnd is required when type is RECESS');
    expect(() => {
      const fakeSchoolSaturdayProps = makeFakeDayOffSchoolProps();
      fakeSchoolSaturdayProps.type = DayOffSchoolType.VOCATION;
      fakeSchoolSaturdayProps.dateEnd = undefined;
      new DayOffSchool(fakeSchoolSaturdayProps);
    }).toThrow('dateEnd is required when type is VOCATION');
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

  it('should create a new DayOffSchoolEntity instance', () => {
    const fakeDayOffSchoolProps = makeFakeDayOffSchoolProps();
    const dayOffSchool = new DayOffSchool(fakeDayOffSchoolProps);
    expect(dayOffSchool).toBeInstanceOf(DayOffSchool);
    expect(dayOffSchool.id).toEqual(fakeDayOffSchoolProps.id);
    expect(dayOffSchool.description).toEqual(fakeDayOffSchoolProps.description);
    expect(dayOffSchool.type).toEqual(fakeDayOffSchoolProps.type);
    expect(dayOffSchool.dateBegin).toEqual(fakeDayOffSchoolProps.dateBegin);
    expect(dayOffSchool.dateEnd).toEqual(fakeDayOffSchoolProps.dateEnd);
    expect(dayOffSchool.createdAt).toEqual(fakeDayOffSchoolProps.createdAt);
    expect(dayOffSchool.updatedAt).toEqual(fakeDayOffSchoolProps.updatedAt);
  });
});
