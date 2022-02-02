import { NextFunction, Request, Response } from 'express';

const ResBodySender = (req: Request, res: Response, next: NextFunction) => {
  let send = res.send;
  res.send = body => {
    res.locals = body;
    res.send = send;
    return res.send(body);
  };
  next();
};

export default ResBodySender;
