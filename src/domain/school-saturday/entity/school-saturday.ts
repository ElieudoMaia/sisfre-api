import { Entity } from '@/domain/@shared/entity/entity.abstract';
import { SchoolSatudayValidatorFactory } from '../factories/school-saturday.validator.factory';

export type ReferencedDayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY';

export type SchoolSaturdayEntityProps = {
  id?: string;
  referringTo: ReferencedDayOfWeek;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export class SchoolSatuday extends Entity {
  private _referringTo: ReferencedDayOfWeek;
  private _date: Date;
  private validator = SchoolSatudayValidatorFactory.create();

  constructor(props: SchoolSaturdayEntityProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._referringTo = props.referringTo;
    this._date = props.date;

    this.validate();
  }

  private validate() {
    this.validator.validate(this);
    this.checkForErrors();
  }

  get referringTo(): ReferencedDayOfWeek {
    return this._referringTo;
  }

  get date(): Date {
    return this._date;
  }
}
