import { ApplicationError } from '@/domain/@shared/error/application-error.error';

export class IncorrectPasswordError extends ApplicationError {
  constructor() {
    super('incorrect password');
    this.name = 'IncorrectPasswordError';
  }
}
