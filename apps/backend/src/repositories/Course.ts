import { Course } from '../schemas';
import { ICourse } from 'models';
import { LeanDocument } from 'mongoose';

export default class CourseRepository {
  model: typeof Course;

  constructor() {
    this.model = Course;
  }

  async createCourse(data: ICourse): Promise<ICourse> {
    return this.model.create(data);
  }
  async getCourses(_id: Record<string, string> = {}): Promise<LeanDocument<ICourse[]>> {
    return this.model.find(_id).lean().exec();
  }
  async getCourse(_id: string): Promise<LeanDocument<ICourse>> {
    return this.model.findById(_id).lean().exec();
  }

  async updateCourse(_id: string, query: Record<string, any>): Promise<LeanDocument<ICourse>> {
    return this.model.findByIdAndUpdate(_id, query).lean().exec();
  }
  async deleteCourse(_id: string): Promise<LeanDocument<ICourse>> {
    return this.model.findByIdAndDelete(_id).lean().exec();
  }
}
