import { Request, Response } from 'express';
import { JobService } from '../../services';

export type IJobController = {
  createJob(req: Request, res: Response): Promise<void>;
  getJob(req: Request, res: Response): Promise<void>;
  getJobs(req: Request, res: Response): Promise<void>;
  updateJob(req: Request, res: Response): Promise<void>;
  deleteJob(req: Request, res: Response): Promise<void>;
};

class JobController implements IJobController {
  jobService: JobService;

  constructor() {
    this.jobService = new JobService();
  }

  getJob = async (req: Request, res: Response): Promise<void> => {
    const { _id } = req.params;
    const data = await this.jobService.getJob(_id);
    res.send(data);
  };

  getJobs = async (req: Request, res: Response): Promise<void> => {
    const data = await this.jobService.getJobs();
    res.send(data);
  };

  createJob = async (req: Request, res: Response): Promise<void> => {
    const { data } = req.body;
    const auth = await this.jobService.createJob(data);
    res.send(auth);
  };

  updateJob = async (req: Request, res: Response): Promise<void> => {
    const { data, idUser } = req.body;
    const { _id } = req.params;
    await this.jobService.updateJob(data, idUser, _id);
    res.end();
  };

  deleteJob = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body;
    await this.jobService.deleteJob(id);
    res.end();
  };
}

export default new JobController();
