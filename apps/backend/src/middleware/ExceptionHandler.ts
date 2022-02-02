import { NextFunction, Request, Response } from 'express';
import { isCelebrate } from 'celebrate';
import { BaseApiError } from 'models';

export const ExceptionHandler = (
  error: Error | BaseApiError,
  req: Request,
  res: Response,
  _: NextFunction,
): Response => {
  if (error instanceof BaseApiError) {
    return res.status(error.status).send(error.message);
  }

  if (isCelebrate(error)) {
    return res.status(400).send(error.message);
  }

  console.info(`Error name: ${error.name}, error message: ${error.message}, stack: ${JSON.stringify(error.stack)}`);
  return res.status(500).send('Unexpected error.');
};
