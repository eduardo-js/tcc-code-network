import { Request, Response } from 'express';
import { TestService } from '../../services';

export type ITestController = {
  createTest(req: Request, res: Response): Promise<void>;
  getTest(req: Request, res: Response): Promise<void>;
  updateTest(req: Request, res: Response): Promise<void>;
  deleteTest(req: Request, res: Response): Promise<void>;
};

class TestController implements ITestController {
  testService: TestService;
  constructor() {
    this.testService = new TestService();
  }

  createTest = async (req: Request, res: Response): Promise<void> => {
    const { data } = req.body;
    const auth = await this.testService.createTest(data);

    res.send(auth);
  };

  getTest = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const data = await this.testService.getTest(id);

    res.send(data);
  };

  updateTest = async (req: Request, res: Response): Promise<void> => {
    const { data, userId } = req.body;
    const { id } = req.params;
    await this.testService.updateTest(data, userId, id);

    res.end();
  };

  deleteTest = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body;
    await this.testService.deleteTest(id);
    res.end();
  };
}

export default new TestController();
