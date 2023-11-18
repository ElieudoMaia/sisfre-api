import { Entity } from '@/domain/@shared/entity/entity.abstract';
import { UserValidatorFactory } from '../factory/user.validator.factory';

export type UserRole = 'ADMINISTRATOR' | 'COORDINATOR' | 'TEACHER';

export type UserEntityProps = {
  id?: string;
  name: string;
  nameAbbreviation: string;
  role: UserRole;
  email: string;
  password: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export class User extends Entity {
  private _name: string = '';
  private _nameAbbreviation: string = '';
  private _email: string = '';
  private _password: string = '';
  private _role: UserRole;
  private _isActive: boolean = true;
  private _isCoordinator: boolean;
  private validator = UserValidatorFactory.create();

  constructor(props: UserEntityProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._nameAbbreviation = props.nameAbbreviation;
    this._email = props.email;
    this._password = props.password;
    this._role = props.role;
    this._isActive = props.isActive ?? true;
    this._isCoordinator = props.role === 'COORDINATOR';

    this.validate();
    this.checkForErrors();
  }

  private validate() {
    this.validator.validate(this);
  }

  get name(): string {
    return this._name;
  }

  get nameAbbreviation(): string {
    return this._nameAbbreviation;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get isCoordinator(): boolean {
    return this._isCoordinator;
  }

  get role(): UserRole {
    return this._role;
  }
}
