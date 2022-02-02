import { Request, Response } from 'express';
import { IUser } from 'models';
import { UserService } from '../../services';

export type IUserController = {
  createUser(req: Request, res: Response): Promise<void>;
  getUser(req: Request, res: Response): Promise<void>;
  patchUser(req: Request, res: Response): Promise<void>;
  deleteUser(req: Request, res: Response): Promise<void>;
};

class UserController implements IUserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  createUser = async (req: Request, res: Response): Promise<void> => {
    const userData: IUser = req.body;
    await this.userService.createUser(userData);

    res.status(201).end();
  };

  getUser = async (req: Request, res: Response): Promise<void> => {
    const { _id } = req.params;
    const data = await this.userService.getUser(_id);

    res.send(data);
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { _id } = req.params;
    await this.userService.deleteUser(_id);
    res.end();
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const { _id, password } = req.body;
    const token = await this.userService.login(_id, password);
    res.send(token);
  };

  patchUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.headers;
    const { course, job } = req.body;
    if (course) await this.userService.patchUserCourse(userId as string, course);
    if (job) await this.userService.patchUserJob(userId as string, job);
    res.end();
  };
}
const userController = new UserController();

export default userController;
