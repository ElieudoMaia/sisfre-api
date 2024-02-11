import { Entity } from '@/domain/@shared/entity/entity.abstract';
import { Course } from '@/domain/course/entity/course';
import { Semester } from '@/domain/semester/entity/semester';
import { ClassValidatorFactory } from '../factories/class.validator.factory';

export enum ClassShift {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  NIGHT = 'NIGHT'
}

export type ClassEntityProps = {
  id?: string;
  semester: Semester;
  shift: ClassShift;
  course: Course;
  coursePeriod: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Class extends Entity {
  private _semester: Semester;
  private _shift: ClassShift;
  private _course: Course;
  private _coursePeriod: number;
  private validator = ClassValidatorFactory.create();

  constructor(props: ClassEntityProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._semester = props.semester;
    this._shift = props.shift;
    this._course = props.course;
    this._coursePeriod = props.coursePeriod;

    this.validate();
  }

  private validate() {
    this.validator.validate(this);
    this.checkForErrors();
  }

  get semester(): Semester {
    return this._semester;
  }

  get shift(): ClassShift {
    return this._shift;
  }

  get course(): Course {
    return this._course;
  }

  get coursePeriod(): number {
    return this._coursePeriod;
  }
}
