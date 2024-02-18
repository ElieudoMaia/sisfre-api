import {
  Semester,
  SemesterEntityProps,
  SemesterOfYear,
  SemesterType
} from '@/domain/semester/entity/semester';
import { describe, expect, it } from 'vitest';
import { fake } from '../../utils/fake-data-generator';

const makeFakeSemesterProps = ({
  id = fake.uuid(),
  createdAt = new Date(),
  updatedAt = new Date()
}: {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
} = {}): SemesterEntityProps => ({
  id,
  year: new Date().getFullYear(),
  semester: SemesterOfYear.FIRST,
  startFirstStage: new Date(),
  endFirstStage: new Date(),
  startSecondStage: new Date(),
  endSecondStage: new Date(),
  type: 'CONVENTIONAL',
  createdAt,
  updatedAt
});

describe('Semester Entity', () => {
  it('should create a new id, createdAt and updatedAt when they are not provided', () => {
    const fakeSemesterProps = makeFakeSemesterProps();
    fakeSemesterProps.id = undefined;
    fakeSemesterProps.createdAt = undefined;
    fakeSemesterProps.updatedAt = undefined;

    const semester = new Semester(fakeSemesterProps);
    expect(semester.id).toBeDefined();
    expect(semester.id).toBeDefined();
    expect(semester.id).toBeTypeOf('string');
    expect(semester.createdAt).toBeDefined();
    expect(semester.createdAt).toBeInstanceOf(Date);
    expect(semester.updatedAt).toBeDefined();
    expect(semester.updatedAt).toBeInstanceOf(Date);
  });

  it('should validate year correctly', () => {
    const fakeSemesterProps = makeFakeSemesterProps();
    expect(() => {
      fakeSemesterProps.year = null as unknown as number;
      new Semester(fakeSemesterProps);
    }).toThrow('year is required');
  });

  it('should validate semester correctly', () => {
    const fakeSemesterProps = makeFakeSemesterProps();
    expect(() => {
      fakeSemesterProps.semester = null as unknown as SemesterOfYear;
      new Semester(fakeSemesterProps);
    }).toThrow('semester is required');
    expect(() => {
      fakeSemesterProps.semester = 0 as SemesterOfYear;
      new Semester(fakeSemesterProps);
    }).toThrow('semester must be 1 or 2');
    expect(() => {
      fakeSemesterProps.semester = 3 as SemesterOfYear;
      new Semester(fakeSemesterProps);
    }).toThrow('semester must be 1 or 2');
    expect(() => {
      fakeSemesterProps.semester = 1.5 as SemesterOfYear;
      new Semester(fakeSemesterProps);
    }).toThrow('semester must be an integer');
    expect(() => {
      fakeSemesterProps.semester = 1 as SemesterOfYear;
      new Semester(fakeSemesterProps);
    }).not.toThrow();
  });

  it('should validate startFirstStage correctly', () => {
    const fakeSemesterProps = makeFakeSemesterProps();
    expect(() => {
      fakeSemesterProps.startFirstStage = null as unknown as Date;
      new Semester(fakeSemesterProps);
    }).toThrow('startFirstStage is required');
    expect(() => {
      fakeSemesterProps.startFirstStage = new Date(2020, 11, 31);
      new Semester(fakeSemesterProps);
    }).toThrow('startFirstStage must be in the same year as year');
    expect(() => {
      fakeSemesterProps.startFirstStage = new Date(2021, 0, 1);
      new Semester(fakeSemesterProps);
    }).toThrow('startFirstStage must be in the same year as year');
    expect(() => {
      new Semester(makeFakeSemesterProps());
    }).not.toThrow();
  });

  it('should validate endFirstStage correctly', () => {
    const fakeSemesterProps = makeFakeSemesterProps();
    expect(() => {
      fakeSemesterProps.endFirstStage = null as unknown as Date;
      new Semester(fakeSemesterProps);
    }).toThrow('endFirstStage is required');
    expect(() => {
      fakeSemesterProps.endFirstStage = new Date(2020, 11, 31);
      new Semester(fakeSemesterProps);
    }).toThrow('endFirstStage must be in the same year as year');
    expect(() => {
      fakeSemesterProps.startFirstStage = new Date(2024, 0, 2);
      fakeSemesterProps.endFirstStage = new Date(2024, 0, 1);
      new Semester(fakeSemesterProps);
    }).toThrow('endFirstStage must be after startFirstStage');
    expect(() => {
      fakeSemesterProps.startFirstStage = new Date(2024, 0, 1);
      fakeSemesterProps.endFirstStage = new Date(2024, 0, 2);
      new Semester(fakeSemesterProps);
    }).not.toThrow();
    expect(() => {
      new Semester(makeFakeSemesterProps());
    }).not.toThrow();
  });

  it('should validate startSecondStage correctly', () => {
    const fakeSemesterProps = makeFakeSemesterProps();
    expect(() => {
      fakeSemesterProps.startSecondStage = null as unknown as Date;
      new Semester(fakeSemesterProps);
    }).toThrow('startSecondStage is required');
    expect(() => {
      fakeSemesterProps.startSecondStage = new Date(2020, 11, 31);
      new Semester(fakeSemesterProps);
    }).toThrow('startSecondStage must be in the same year as year');
    expect(() => {
      fakeSemesterProps.endFirstStage = new Date(2024, 0, 2);
      fakeSemesterProps.startSecondStage = new Date(2024, 0, 1);
      new Semester(fakeSemesterProps);
    }).toThrow('startSecondStage must be after endFirstStage');
    expect(() => {
      fakeSemesterProps.startFirstStage = new Date(2024, 0, 1);
      fakeSemesterProps.endFirstStage = new Date(2024, 0, 2);
      fakeSemesterProps.startSecondStage = new Date(2024, 0, 3);
      new Semester(fakeSemesterProps);
    }).not.toThrow();
    expect(() => {
      new Semester(makeFakeSemesterProps());
    }).not.toThrow();
  });

  it('should validate endSecondStage correctly', () => {
    const fakeSemesterProps = makeFakeSemesterProps();
    fakeSemesterProps.startFirstStage = new Date(2024, 0, 1);
    fakeSemesterProps.endFirstStage = new Date(2024, 0, 2);

    expect(() => {
      fakeSemesterProps.endSecondStage = null as unknown as Date;
      new Semester(fakeSemesterProps);
    }).toThrow('endSecondStage is required');
    expect(() => {
      fakeSemesterProps.endSecondStage = new Date(2020, 11, 31);
      new Semester(fakeSemesterProps);
    }).toThrow('endSecondStage must be in the same year as year');
    expect(() => {
      fakeSemesterProps.startSecondStage = new Date(2024, 0, 4);
      fakeSemesterProps.endSecondStage = new Date(2024, 0, 3);
      new Semester(fakeSemesterProps);
    }).toThrow('endSecondStage must be after startSecondStage');
    expect(() => {
      fakeSemesterProps.startSecondStage = new Date(2024, 0, 3);
      fakeSemesterProps.endSecondStage = new Date(2024, 0, 4);
      new Semester(fakeSemesterProps);
    }).not.toThrow();
    expect(() => {
      new Semester(makeFakeSemesterProps());
    }).not.toThrow();
  });

  it('should validate type correctly', () => {
    const fakeSemesterProps = makeFakeSemesterProps();
    expect(() => {
      fakeSemesterProps.type = null as unknown as SemesterType;
      new Semester(fakeSemesterProps);
    }).toThrow('type is required');
    expect(() => {
      fakeSemesterProps.type = 'INVALID' as SemesterType;
      new Semester(fakeSemesterProps);
    }).toThrow('type must be REGULAR or CONVENTIONAL');
    expect(() => {
      fakeSemesterProps.type = 'CONVENTIONAL' as SemesterType;
      new Semester(fakeSemesterProps);
    }).not.toThrow();
    expect(() => {
      fakeSemesterProps.type = 'REGULAR' as SemesterType;
      new Semester(fakeSemesterProps);
    }).not.toThrow();
  });

  it('should validate updatedAt correctly', () => {
    const fakeSemesterProps = makeFakeSemesterProps();
    expect(() => {
      fakeSemesterProps.updatedAt = 'INVALID VALUE' as unknown as Date;
      new Semester(fakeSemesterProps);
    });
    expect(() => {
      const createdAt = new Date();
      fakeSemesterProps.createdAt = createdAt;
      fakeSemesterProps.updatedAt = new Date(
        createdAt.getFullYear(),
        createdAt.getMonth(),
        createdAt.getDate() - 1
      );
      new Semester(fakeSemesterProps);
    }).toThrow('updatedAt must be after createdAt');
    expect(() => {
      new Semester(makeFakeSemesterProps());
    }).not.toThrow();
  });
});
