import { ApplicationError } from './application-error.error';

export class InvalidResourceErro extends ApplicationError {
  constructor(msg: string) {
    super(msg);
    this.name = 'InvalidResourceErro';
  }
}
