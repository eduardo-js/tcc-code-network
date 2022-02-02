import { Router } from 'express';
import { TestController } from '../../controllers';

const routes = Router();

routes.get('/_:id', TestController.getTest);

routes.post('/create', TestController.createTest);

routes.patch('/_:id', TestController.updateTest);

routes.delete('/_:id', TestController.deleteTest);

export default routes;
