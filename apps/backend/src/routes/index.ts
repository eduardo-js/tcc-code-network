import { Application, Router } from 'express';
import v1 from './v1';

export type IRouteResolver = {
  routes: Router;
};
export default class RouteResolver implements IRouteResolver {
  routes: Router;

  constructor(app: Application) {
    this.routes = Router();
    this.init(app);
  }

  init(app: Application) {
    app.use('/api/v1', v1);
  }
}
