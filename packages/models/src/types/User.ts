import { Permission, Technology } from '../enums';

interface CourseProgress {
  _id: string;
  class: number;
}

interface JobProgress {
  _id: string;
}

export type IUser = {
  _id: string;
  name: string;
  password: string;
  telephone: string;
  permission: Permission;
  ownership: string[];
  technologies?: Technology[];
  certificates?: string[];
  courses?: CourseProgress[];
  jobs?: JobProgress[];
};
