import { Router } from 'express';

import User from './User';
import Course from './Course';
import Video from './Video';
import Job from './Job';
import Test from './Test';

const v1 = Router();

v1.use('/user', User);
v1.use('/course', Course);
v1.use('/video', Video);
v1.use('/job', Job);
v1.use('/tests', Test);

export default v1;
