import mongoose, { Schema } from 'mongoose';
import { ICourse, Technology } from 'models';

export const LessonSchema = new Schema(
  {
    lessonName: { type: String, required: true },
    lessonImage: { type: String, required: true },
    lessonDescription: { type: String, required: true },
    videoName: { type: String },
    videoPath: { type: String },
  },
  { _id: false },
);

const CourseSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    hoursOfDuration: { type: String },
    image: { type: String, required: true },
    technologies: { type: [String], enum: Technology, required: true },
    createdAt: { type: Date, required: true, default: Date.now() },
    numberOfGraduates: { type: Number, default: 0 },
    lessons: [LessonSchema],
  },
  {
    timestamps: true,
  },
);

const Course = mongoose.model<ICourse>('courses', CourseSchema);

export default Course;
