import { Request, Response } from 'express';
import { CourseService } from '../../services';

export type ICourseController = {
  createCourse(req: Request, res: Response): Promise<void>;
  getCourse(req: Request, res: Response): Promise<void>;
  getCourses(req: Request, res: Response): Promise<void>;
  updateCourse(req: Request, res: Response): Promise<void>;
  deleteCourse(req: Request, res: Response): Promise<void>;
};

class CourseController implements ICourseController {
  courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  createCourse = async (req: Request, res: Response): Promise<void> => {
    const courseId = await this.courseService.createCourse(req.body);
    res.send(courseId);
  };

  getCourse = async (req: Request, res: Response): Promise<void> => {
    const { _id } = req.params;
    const data = await this.courseService.getCourse(_id as string);
    res.send(data);
  };

  getCourses = async (req: Request, res: Response): Promise<void> => {
    const data = await this.courseService.getCourses();
    res.send(data);
  };

  updateCourse = async (req: Request, res: Response): Promise<void> => {
    const { data, userId } = req.body;
    const { _id } = req.params;
    await this.courseService.updateCourse(data, userId, _id);

    res.end();
  };
  deleteCourse = async (req: Request, res: Response): Promise<void> => {
    const { _id } = req.body;
    await this.courseService.deleteCourse(_id);
    res.end();
  };
}

export default new CourseController();
