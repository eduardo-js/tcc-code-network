import winston from 'winston';
import { NextFunction, Request, Response } from 'express';
import chalk from 'chalk';
import { randomUUID } from 'crypto';

const loggerInfo = winston.createLogger({
  format: winston.format.printf(({ message }: any) => {
    if (message.status > 299) message.status = chalk.red(message.status);
    else if (message.status > 199) message.status = chalk.green(message.status);
    else message.status = chalk.yellow(message.status);
    return `{"id": "${chalk.blue(message.id)}", "status": "${message.status}", "method": "${message.method}", "url": "${
      message.url
    }", "headers": ${message.headers}, "body": ${message.body}, ${chalk.yellowBright(
      '"response": ' + message.response,
    )}, "timestamp": "${message.timestamp}"}`;
  }),
  transports: [new winston.transports.Console()],
});

const logger = (req: Request, res: Response, next: NextFunction) => {
  res.on('finish', () => {
    if (req.body?.password) req.body.password = '';
    loggerInfo.info({
      timestamp: new Date().toISOString(),
      id: randomUUID(),
      status: res.statusCode,
      method: req.method,
      url: req.originalUrl,
      headers: JSON.stringify(req.headers),
      body: JSON.stringify(req.body),
      response: JSON.stringify(res.locals),
    });
  });
  next();
};
export default logger;
