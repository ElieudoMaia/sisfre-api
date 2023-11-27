import { ApplicationError } from './application-error.error';

export class InvalidParamError extends ApplicationError {
  constructor(msg: string) {
    super(msg);
    this.name = 'InvalidParamError';
  }
}
