export class UnexpectedError extends Error {
  constructor(msg = 'Unexpected error') {
    super(msg);
    this.name = 'UnexpectedError';
  }
}
