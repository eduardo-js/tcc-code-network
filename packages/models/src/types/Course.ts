import { ILesson } from '.';
import { Technology } from '../enums';

export type ICourse = {
  _id: string;
  name: string;
  description: string;
  details: string[];
  hoursOfDuration?: string;
  image: string;
  technologies: Technology[];
  createdAt: Date;
  updatedAt: Date;
  numberOfGraduates?: number;
  numberOfEnrolled: number;
  lessons?: ILesson[];
};
