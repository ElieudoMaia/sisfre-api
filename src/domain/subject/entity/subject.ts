import { Entity } from '@/domain/@shared/entity/entity.abstract';
import { Course } from '@/domain/course/entity/course';

export type SubjectEntityProps = {
  id?: string;
  name: string;
  acronym: string;
  course: Course;
  coursePeriod: number;
  quantityOfClasses: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Subject extends Entity {
  private _name: string;
  private _acronym: string;
  private _course: Course;
  private _coursePeriod: number;
  private _quantityOfClasses: number;
  private validator = SubjectValidatorFactory.create();

  constructor(props: SubjectEntityProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._acronym = props.acronym;
    this._course = props.course;
    this._coursePeriod = props.coursePeriod;
    this._quantityOfClasses = props.quantityOfClasses;

    this.validate();
  }

  private validate() {
    this.validator.validate(this);
    this.checkForErrors();
  }

  get name() {
    return this._name;
  }

  get acronym() {
    return this._acronym;
  }

  get course() {
    return this._course;
  }

  get coursePeriod() {
    return this._coursePeriod;
  }

  get quantityOfClasses() {
    return this._quantityOfClasses;
  }
}
