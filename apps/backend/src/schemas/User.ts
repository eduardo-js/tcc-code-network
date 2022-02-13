import mongoose, { Schema } from 'mongoose';
import { Permission, Technology, IUser, JobStep } from 'models';

const CourseProgressSchema = new Schema({
  _id: { type: String, required: true },
  lesson: { type: Number, required: true, default: 0 },
});
const JobProgressSchema = new Schema({
  _id: { type: String, required: true },
  status: { type: String, enum: JobStep, required: true }
});

export const UserSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    telephone: { type: String, required: true },
    permission: { type: Number, enum: Permission, required: true },
    technologies: { type: [String], enum: Technology },
    ownership: { type: [String] },
    jobs: [JobProgressSchema],
    courses: [CourseProgressSchema],
    certificates: { type: [String] },
  },
  { _id: false },
);

const User = mongoose.model<IUser>('users', UserSchema);

export default User;
