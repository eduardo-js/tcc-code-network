import { IQuestion } from '.';

export type ILesson = {
  lessonName: string;
  lessonImage: string;
  lessonDescription: string;
  test: IQuestion[];
  videoDuration: string;
  videoName: string;
  videoPath: string;
};
