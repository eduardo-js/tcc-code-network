import mongoose, { Schema } from 'mongoose';
import { Technology, ITest } from 'models';

export const TestsSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String },
  description: { type: String },
  duration: [{ type: String }],
  technologies: { type: [String], enum: Technology, required: true },
  creationDate: { type: Date },
});

const Tests = mongoose.model<ITest>('tests', TestsSchema);

export default Tests;
