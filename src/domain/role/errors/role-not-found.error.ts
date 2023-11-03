import { ApplicationError } from '../../@shared/error/application-error.error';

export class RoleNotFoundError extends ApplicationError {
  constructor(msg: string) {
    super(msg);
    this.name = 'RoleNotFoundError';
  }
}
