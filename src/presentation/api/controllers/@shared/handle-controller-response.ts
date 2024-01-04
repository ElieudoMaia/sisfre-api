/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApplicationError } from '@/domain/@shared/error/application-error.error';
import { NotAllowedError } from '@/domain/@shared/error/not-allowed.error';
import { NotFoundError } from '@/domain/@shared/error/not-found.error';
import { NotificationError } from '@/domain/@shared/notification/notification.error';

export const handleControllerResponse = (
  error: Error
): {
  statusCode: number;
  response: any;
} => {
  let statusCode = 500;
  if (error instanceof NotAllowedError) statusCode = 401;
  if (error instanceof NotFoundError) statusCode = 404;
  if (error instanceof ApplicationError) statusCode = 400;
  if (error instanceof NotificationError) {
    statusCode = 400;
    error.message = error.errors.map((error) => error.message).join(', ');
  }

  const isServerError = statusCode >= 500;

  error.message = isServerError ? 'Internal Server Error' : error.message;

  return {
    statusCode,
    response: error
  };
};
