import { ApplicationError } from '@/domain/@shared/error/application-error.error';

export class UserNotFoundError extends ApplicationError {
  constructor(msg = 'user not found') {
    super(msg);
    this.name = 'UserNotFoundError';
  }
}
