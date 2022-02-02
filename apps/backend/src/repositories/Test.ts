import { Test } from '../schemas';
import { ITest } from 'models';
import { LeanDocument } from 'mongoose';

export default class TestRepository {
  model: typeof Test;

  constructor() {
    this.model = Test;
  }

  async createTest(data: ITest): Promise<ITest> {
    return this.model.create(data);
  }

  async getTest(_id: Record<string, string> = {}): Promise<LeanDocument<ITest[]>> {
    return this.model.find(_id).lean().exec();
  }

  async updateTest(_id: string, query: Record<string, any>): Promise<LeanDocument<ITest>> {
    return this.model.findByIdAndUpdate(_id, query).lean().exec();
  }

  async deleteTest(_id: string): Promise<LeanDocument<ITest>> {
    return this.model.findByIdAndDelete(_id).lean().exec();
  }
}
