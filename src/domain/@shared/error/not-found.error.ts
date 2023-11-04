import { ApplicationError } from '@/domain/@shared/error/application-error.error';

export class NotFoundError extends ApplicationError {
  constructor(msg: string) {
    super(msg);
    this.name = 'NotFoundError';
  }
}
