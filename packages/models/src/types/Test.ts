import { Technology } from '../enums';

export type ITest = {
  _id: string;
  name: string;
  description: string;
  technologies: Technology[];
  creationDate: Date;
};
