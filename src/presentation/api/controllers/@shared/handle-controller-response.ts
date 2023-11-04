/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApplicationError } from '@/domain/@shared/error/application-error.error';
import { NotAllowedError } from '@/domain/@shared/error/not-allowed.error';
import { NotFoundError } from '@/domain/@shared/error/not-found.error';

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

  const err = error as Error;
  const isServerError = statusCode >= 500;

  err.message = isServerError ? 'Internal Server Error' : error.message;

  return {
    statusCode,
    response: error
  };
};
