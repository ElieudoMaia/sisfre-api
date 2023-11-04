/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApplicationError } from '@/domain/@shared/error/application-error.error';

export const handleControllerResponse = (
  error: Error
): {
  statusCode: number;
  response: any;
} => {
  const isApplicationError = error instanceof ApplicationError;
  const statusCode = isApplicationError ? 400 : 500;

  const err = error as Error;

  err.message = isApplicationError ? error.message : 'Internal Server Error';

  return {
    statusCode,
    response: error
  };
};
