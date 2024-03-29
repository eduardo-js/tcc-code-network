import { Permission, Technology } from '../enums';

export type CourseProgress = {
  _id: string;
  lesson: number;
};

export type JobProgress = {
  _id: string;
  status: 'AWAITING' | 'REJECTED' | 'APPROVED';
};

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
