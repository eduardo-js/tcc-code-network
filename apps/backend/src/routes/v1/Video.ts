import { Router } from 'express';
import multer from 'multer';
import { VideoController } from '../../controllers';

const routes = Router();

const upload = multer({ dest: 'uploads/' });

routes.get('/', VideoController.retrieveVideo);

routes.post('/', upload.single('filename'), VideoController.uploadVideo);

export default routes;
