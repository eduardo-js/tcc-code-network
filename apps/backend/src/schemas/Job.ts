import mongoose, { Schema } from 'mongoose';
import { IJob, Technology } from 'models';

export const JobSchema = new Schema({
  applicants: { type: [String] },
  creationDate: { type: Date },
  description: { type: String },
  duration: { type: Date },
  endDate: { type: Date },
  image: { type: String },
  owner: { type: String },
  name: { type: String },
  payment: { type: String },
  requirements: [{ type: String }],
  technologies: { type: [String], enum: Technology, required: true },
});

const Job = mongoose.model<IJob>('jobs', JobSchema);

export default Job;
