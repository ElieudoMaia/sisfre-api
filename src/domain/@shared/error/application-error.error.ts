export class ApplicationError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'ApplicationError';
  }
}
