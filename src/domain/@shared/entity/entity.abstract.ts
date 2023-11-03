import * as crypto from 'crypto';
import { Notification } from '../notification/notification';
import { NotificationError } from '../notification/notification.error';

export abstract class Entity {
  protected _id: string = '';
  private _createdAt: Date;
  private _updatedAt: Date;
  public notification: Notification;

  constructor(id?: string, createdAt?: Date, updatedAt?: Date) {
    this._id = id || crypto.randomUUID();
    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt || new Date();
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

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
