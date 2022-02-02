import { LeanDocument } from 'mongoose';
import { CourseRepository } from '../../repositories';
import { ICourse, Permission } from 'models';
import { NotFound, NotCreated, Unauthorized } from '../../errors';
import { UserService } from '../../services';

export type ICourseService = {
  createCourse(data: ICourse): Promise<Record<string, string>>;
  getCourse(_id: string): Promise<LeanDocument<ICourse>>;
  getCourses(req: Request, res: Response): Promise<LeanDocument<ICourse[]>>;
  updateCourse(data: Partial<ICourse>, idUser: string, idCourse: string): Promise<void>;
  deleteCourse(id: string): Promise<LeanDocument<ICourse>>;
};

export default class CourseService implements ICourseService {
  courseRepository: CourseRepository;
  userService: UserService;
  constructor() {
    this.courseRepository = new CourseRepository();
    this.userService = new UserService();
  }

  createCourse = async (data: ICourse): Promise<Record<string, string>> => {
    const course = await this.courseRepository.createCourse(data);
    if (!course) throw new NotCreated();
    return { _id: course._id };
  };

  getCourse = async (_id: string): Promise<LeanDocument<ICourse>> => {
    const course = await this.courseRepository.getCourse(_id);
    if (!course) throw new NotFound();
    return course;
  };

  getCourses = async (): Promise<LeanDocument<ICourse[]>> => {
    const courses = await this.courseRepository.getCourses();
    if (!courses) throw new NotFound();
    return courses;
  };

  updateCourse = async (data: Partial<ICourse>, idUser: string, idCourse: string): Promise<void> => {
    const user = await this.userService.getUser(idUser);
    if (!user || user[0].permission !== Permission.teacher || !user[0].ownership.includes(idCourse))
      throw new Unauthorized();
    await this.courseRepository.updateCourse(idCourse, data);
  };

  deleteCourse = async (id: string): Promise<LeanDocument<ICourse>> => {
    const Course = await this.courseRepository.deleteCourse(id);
    return Course;
  };
}
