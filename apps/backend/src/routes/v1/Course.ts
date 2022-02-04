import { Router } from 'express';
import { CourseController } from '../../controllers';
import { validateCourseData } from '../../validators';

const routes = Router();

routes.get('/', CourseController.getCourses);

routes.get('/:_id', CourseController.getCourse);

routes.post('/create', validateCourseData, CourseController.createCourse);

routes.patch('/:_id', CourseController.updateCourse);

routes.delete('/:_id', CourseController.deleteCourse);

export default routes;
