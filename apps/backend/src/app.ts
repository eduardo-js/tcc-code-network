import express, { Application } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { ExceptionHandler, AuthHandler } from './middleware';
import RouteResolver from './routes';
import logger from './middleware/Logger';
import ResBodySender from './middleware/ResSender';

class App {
  app: Application;
  routes: RouteResolver;
  constructor() {
    this.app = express();
    this.init();
  }
  init() {
    this.app.use(express.json());
    this.app.use(cors({ allowedHeaders: '*', origin: '*', methods: '*' }));
    this.app.use(AuthHandler);
    this.app.use(logger);
    this.app.use(ResBodySender);
    this.routes = new RouteResolver(this.app);
    this.app.use(ExceptionHandler);
  }
}

export default new App().app;
