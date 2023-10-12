export type NotificationErrorProps = {
  message: string;
  context: string;
};

export class Notification {
  private _errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps) {
    this._errors.push(error);
  }

  hasErrors(): boolean {
    return this._errors.length > 0;
  }

  get errors(): NotificationErrorProps[] {
    return this._errors;
  }

  messages(context?: string) {
    let filteredErrors = this._errors;
    if (context) {
      filteredErrors = filteredErrors.filter(
        (error) => error.context === context
      );
    }
    return filteredErrors
      .map((error) => `${error.context}: ${error.message}`)
      .join(", ");
  }
}
