import { ApplicationError } from './application-error.error';

export class InvalidResourceError extends ApplicationError {
  constructor(msg: string) {
    super(msg);
    this.name = 'InvalidResourceError';
  }
}
