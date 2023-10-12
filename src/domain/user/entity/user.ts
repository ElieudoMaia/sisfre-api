import { Entity } from '@/domain/@shared/entity/entity.abstract';
import { UserValidatorFactory } from '../factory/user.validator.factory';

export class User extends Entity {
  private _name: string = '';
  private _email: string = '';
  private _password: string = '';
  private validator = UserValidatorFactory.create();

  constructor(id: string, name: string, email: string, password: string) {
    super();
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;

    this.validate();
    this.checkForErrors();
  }

  private validate() {
    this.validator.validate(this);
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
}
