import { Technology } from '../enums';

export type IJob = {
  _id: string;
  applicants: string[];
  creationDate: Date;
  description: string;
  duration: Date;
  endDate: Date;
  image: string;
  owner: string;
  name: string;
  payment: string;
  requirements: string[];
  technologies: Technology[];
};
