import { Entity } from '@/domain/@shared/entity/entity.abstract';
import { SemesterValidatorFactory } from '../factories/semester.validator.factory';

export type SemesterType = 'REGULAR' | 'CONVENTIONAL';
export type SemesterOfYear = 1 | 2;

export type SemesterEntityProps = {
  id?: string;
  year: number;
  semester: SemesterOfYear;
  startFirstStage: Date;
  endFirstStage: Date;
  startSecondStage: Date;
  endSecondStage: Date;
  type: SemesterType;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Semester extends Entity {
  private _year: number;
  private _semester: SemesterOfYear;
  private _startFirstStage: Date;
  private _endFirstStage: Date;
  private _startSecondStage: Date;
  private _endSecondStage: Date;
  private _type: SemesterType;
  private validator = SemesterValidatorFactory.create();

  constructor(props: SemesterEntityProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._year = props.year;
    this._semester = props.semester;
    this._startFirstStage = props.startFirstStage;
    this._endFirstStage = props.endFirstStage;
    this._startSecondStage = props.startSecondStage;
    this._endSecondStage = props.endSecondStage;
    this._type = props.type;

    this.validate();
    this.checkForErrors();
  }

  private validate() {
    this.validator.validate(this);
  }

  get year(): number {
    return this._year;
  }

  get semester(): SemesterOfYear {
    return this._semester;
  }

  get startFirstStage(): Date {
    return this._startFirstStage;
  }

  get endFirstStage(): Date {
    return this._endFirstStage;
  }

  get startSecondStage(): Date {
    return this._startSecondStage;
  }

  get endSecondStage(): Date {
    return this._endSecondStage;
  }

  get type(): SemesterType {
    return this._type;
  }
}
