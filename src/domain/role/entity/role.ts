import { Entity } from '@/domain/@shared/entity/entity.abstract';
import { RoleValidatorFactory } from '../factory/role.validator.factory';

export type RoleEnttyProps = {
  id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Role extends Entity {
  private _name: string = '';
  private validator = RoleValidatorFactory.create();

  constructor(props: RoleEnttyProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;

    this.validate();
    this.checkForErrors();
  }

  private validate() {
    this.validator.validate(this);
  }

  get name(): string {
    return this._name;
  }
}
