import { LeanDocument } from 'mongoose';
import { TestRepository } from '../../repositories';
import { UserService } from '../../services';
import { ITest, Permission } from 'models';
import { NotFound, NotCreated, Unauthorized } from '../../errors';
import { IUserService } from './User';

export type IJTestService = {
  createTest(data: ITest): Promise<string>;
  getTest(_id?: string): Promise<LeanDocument<ITest>>;
  updateTest(data: Partial<ITest>, idUser: string, idTest: string): Promise<void>;
  deleteTest(id: string): Promise<LeanDocument<ITest>>;
};

export default class TestService implements IJTestService {
  testRepository: TestRepository;
  userService: IUserService;

  constructor() {
    this.testRepository = new TestRepository();
    this.userService = new UserService();
  }

  async createTest(data: ITest): Promise<string> {
    const Test = await this.testRepository.createTest(data);
    if (!Test) throw new NotCreated();
    return Test._id;
  }

  async getTest(_id?: string): Promise<LeanDocument<ITest>> {
    const Test = await this.testRepository.getTest({ _id });
    if (!Test) throw new NotFound();
    return Test[0];
  }

  async updateTest(data: Partial<ITest>, idUser: string, idTest: string): Promise<void> {
    const user = await this.userService.getUser(idUser);
    if (!user || user[0].permission !== Permission.teacher || !user[0].ownership.includes(idTest))
      throw new Unauthorized();
    await this.testRepository.updateTest(idTest, data);
  }

  async deleteTest(id: string): Promise<LeanDocument<ITest>> {
    const Test = await this.testRepository.deleteTest(id);

    return Test;
  }
}
