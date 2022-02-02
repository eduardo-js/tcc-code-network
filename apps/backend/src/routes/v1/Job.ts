import { JobController } from '../../controllers';
import { Router } from 'express';

const routes = Router();

routes.get('/', JobController.getJobs);

routes.get('/:_id', JobController.getJob);

routes.post('/create', JobController.createJob);

routes.patch('/:_id', JobController.updateJob);

routes.delete('/:_id', JobController.deleteJob);

export default routes;
