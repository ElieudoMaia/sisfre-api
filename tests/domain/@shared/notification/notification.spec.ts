import { describe, expect, it } from 'vitest';
import { Notification } from '../../../../src/domain/@shared/notification/notification';

describe('Unit tests for notification', () => {
  it('should create erros', () => {
    const notification = new Notification();

    const error1 = {
      message: 'error message 1',
      context: 'customer'
    };
    notification.addError(error1);
    expect(notification.messages('customer')).toBe('customer: error message 1');

    const error2 = {
      message: 'error message 2',
      context: 'customer'
    };
    notification.addError(error2);
    expect(notification.messages('customer')).toBe(
      'customer: error message 1, customer: error message 2'
    );

    const error3 = {
      message: 'error message 3',
      context: 'other-context'
    };
    notification.addError(error3);
    expect(notification.messages('customer')).toBe(
      'customer: error message 1, customer: error message 2'
    );

    expect(notification.messages()).toBe(
      'customer: error message 1, customer: error message 2, other-context: error message 3'
    );
  });

  it('should check if notification has at least one error', () => {
    const notification = new Notification();
    expect(notification.hasErrors()).toBe(false);
    const error1 = {
      message: 'error message 1',
      context: 'context'
    };
    notification.addError(error1);
    expect(notification.hasErrors()).toBe(true);
  });

  it('should get all errros props', () => {
    const notification = new Notification();
    const error = {
      message: 'error message 1',
      context: 'context'
    };
    notification.addError(error);
    expect(notification.errors).toEqual([error]);
  });
});
