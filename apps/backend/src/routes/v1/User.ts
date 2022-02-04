import { Router } from 'express';
import { UserController } from '../../controllers';
import { validateUserData, validateLoginData, validatePatchUser } from '../../validators';

const routes = Router();

routes.get('/:_id', UserController.getUser);

routes.post('/create', validateUserData, UserController.createUser);

routes.post('/login', validateLoginData, UserController.login);

routes.delete('/:_id', UserController.deleteUser);

routes.patch('/', validatePatchUser, UserController.patchUser);

export default routes;
