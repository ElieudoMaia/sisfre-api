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
  dateBegin: Date;
  dateEnd?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export class DayOffSchool extends Entity {
  private _description: string;
  private _type: DayOffSchoolType;
  private _dateBegin: Date;
  private _dateEnd?: Date;
  private validator = DayOffSchoolValidatorFactory.create();

  constructor(props: DayOffSchoolEntityProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._description = props.description;
    this._type = props.type;
    this._dateBegin = props.dateBegin;
    this._dateBegin?.setHours(0, 0, 0, 0);

    if (
      props.type === DayOffSchoolType.RECESS ||
      props.type === DayOffSchoolType.VOCATION
    ) {
      this._dateEnd = props.dateEnd;
      this._dateEnd?.setHours(0, 0, 0, 0);
    }

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

  get dateBegin(): Date {
    return this._dateBegin;
  }

  get dateEnd(): Date | undefined {
    return this._dateEnd;
  }
}
