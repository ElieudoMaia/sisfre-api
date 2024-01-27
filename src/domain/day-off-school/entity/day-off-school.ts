import { Entity } from '@/domain/@shared/entity/entity.abstract';
import { DayOffSchoolValidatorFactory } from '../factories/day-off-school.validator.factory';

export enum DayOffSchoolType {
  HOLIDAY = 'HOLIDAY',
  RECESS = 'RECESS',
  VOCATION = 'VOCATION'
}

export type DayOffSchoolEntityProps = {
  id?: string;
  description: string;
  type: DayOffSchoolType;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export class DayOffSchool extends Entity {
  private _description: string;
  private _type: DayOffSchoolType;
  private _date: Date;
  private validator = DayOffSchoolValidatorFactory.create();

  constructor(props: DayOffSchoolEntityProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._description = props.description;
    this._type = props.type;
    this._date = props.date;
    this._date?.setHours(0, 0, 0, 0);

    this.validate();
  }

  private validate() {
    this.validator.validate(this);
    this.checkForErrors();
  }

  get description(): string {
    return this._description;
  }

  get type(): DayOffSchoolType {
    return this._type;
  }

  get date(): Date {
    return this._date;
  }
}
