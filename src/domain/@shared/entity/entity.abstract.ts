import { Notification } from '../notification/notification';
import { NotificationError } from '../notification/notification.error';

export abstract class Entity {
  protected _id: string = '';
  public notification: Notification;

  constructor() {
    this.notification = new Notification();
  }

  protected checkForErrors() {
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors);
    }
  }

  get id(): string {
    return this._id;
  }
}
