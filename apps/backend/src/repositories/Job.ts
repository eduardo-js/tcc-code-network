import { Job } from '../schemas';
import { IJob } from 'models';
import { LeanDocument } from 'mongoose';

export default class JobRepository {
  model: typeof Job;

  constructor() {
    this.model = Job;
  }

  async createJob(data: IJob): Promise<IJob> {
    return await this.model.create(data);
  }

  async getJob(_id: string): Promise<LeanDocument<IJob>> {
    return await this.model.findById(_id).lean().exec();
  }

  async getJobs(): Promise<LeanDocument<IJob[]>> {
    return await this.model.find().lean().exec();
  }

  async updateJob(_id: string, update: Record<string, any>): Promise<LeanDocument<IJob>> {
    return await this.model.findByIdAndUpdate({ _id }, update).lean().exec();
  }

  async deleteJob(_id: string): Promise<LeanDocument<IJob>> {
    return await this.model.findByIdAndDelete(_id).lean().exec();
  }
}
