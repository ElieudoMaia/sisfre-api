import { Entity } from '@/domain/@shared/entity/entity.abstract';
import { Role } from '@/domain/role/entity/role';
import { UserValidatorFactory } from '../factory/user.validator.factory';

export type UserEntityProps = {
  id?: string;
  name: string;
  nameAbreviation: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class User extends Entity {
  private _name: string = '';
  private _nameAbreviation: string = '';
  private _email: string = '';
  private _password: string = '';
  private _role?: Role;
  private validator = UserValidatorFactory.create();

  constructor(props: UserEntityProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._nameAbreviation = props.nameAbreviation;
    this._email = props.email;
    this._password = props.password;

    this.validate();
    this.checkForErrors();
  }

  private validate() {
    this.validator.validate(this);
  }

  get name(): string {
    return this._name;
  }

  get nameAbreviation(): string {
    return this._nameAbreviation;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get role(): Role | undefined {
    return this._role;
  }

  public changeRole(role: Role) {
    this._role = role;
  }
}
