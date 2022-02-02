import { LeanDocument } from 'mongoose';
import { IJob, Permission } from 'models';
import { NotCreated, NotFound, Unauthorized } from '../../errors';
import { UserService } from '../../services';
import { JobRepository } from '../../repositories';

export type IJobService = {
  createJob(data: IJob): Promise<string>;
  getJob(_id: string): Promise<LeanDocument<IJob>>;
  getJobs(): Promise<LeanDocument<IJob[]>>;
  updateJob(data: Partial<IJob>, idUser: string, idJob: string): Promise<void>;
  deleteJob(id: string): Promise<LeanDocument<IJob>>;
};

export default class JobService implements IJobService {
  jobRepository: JobRepository;
  userService: UserService;

  constructor() {
    this.jobRepository = new JobRepository();
    this.userService = new UserService();
  }
  async createJob(data: IJob): Promise<string> {
    const job = await this.jobRepository.createJob(data);
    if (!job) throw new NotCreated();
    return job._id;
  }

  async getJob(_id: string): Promise<LeanDocument<IJob>> {
    const job = await this.jobRepository.getJob(_id);
    if (!job) throw new NotFound();
    return job;
  }

  async getJobs(): Promise<LeanDocument<IJob[]>> {
    const job = await this.jobRepository.getJobs();
    if (!job) throw new NotFound();
    return job;
  }

  async updateJob(data: Partial<IJob>, idUser: string, idJob: string): Promise<void> {
    const user = await this.userService.getUser(idUser);
    if (!user || user[0].permission !== Permission.enterprise || !user[0].ownership.includes(idJob))
      throw new Unauthorized();
    await this.jobRepository.updateJob(idJob, data);
  }

  async deleteJob(id: string): Promise<LeanDocument<IJob>> {
    const job = await this.jobRepository.deleteJob(id);
    return job;
  }
}
