import { ApplicationError } from '@/domain/@shared/error/application-error.error';

export class NotAllowedError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = 'NotAllowedError';
  }
}
