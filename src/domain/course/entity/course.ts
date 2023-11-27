import { Entity } from '@/domain/@shared/entity/entity.abstract';
import { CourseValidatorFactory } from '../factory/course.validator.factory';

export type CourseType = 'GRADUATION' | 'INTEGRATED' | 'TECHNICAL';

export type CourseEntityProps = {
  id?: string;
  name: string;
  type: CourseType;
  coordinatorId: string;
  acronym: string;
  duration: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Course extends Entity {
  private _name: string;
  private _type: CourseType;
  private _coordinatorId: string;
  private _acronym: string;
  private _duration: number;
  private validator = CourseValidatorFactory.create();

  constructor(props: CourseEntityProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._type = props.type;
    this._coordinatorId = props.coordinatorId;
    this._acronym = props.acronym;
    this._duration = props.duration;

    this.validate();
    this.checkForErrors();
  }

  private validate() {
    this.validator.validate(this);
  }

  get name(): string {
    return this._name;
  }

  get type(): CourseType {
    return this._type;
  }

  get coordinatorId(): string {
    return this._coordinatorId;
  }

  get acronym(): string {
    return this._acronym;
  }

  get duration(): number {
    return this._duration;
  }
}