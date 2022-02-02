import { LeanDocument, UpdateQuery } from 'mongoose';
import { IUser } from 'models';
import { User } from '../schemas';

export default class UserRepository {
  model: typeof User;

  constructor() {
    this.model = User;
  }

  async createUser(data: LeanDocument<IUser>): Promise<IUser> {
    return this.model.create(data);
  }

  async getUsers(_id: Record<string, string> = {}): Promise<LeanDocument<IUser[]>> {
    return this.model.find(_id).lean().exec();
  }
  async getUser(_id: string): Promise<LeanDocument<IUser>> {
    return this.model.findById(_id).lean().exec();
  }

  async patchUser(_id: string, update: UpdateQuery<IUser>): Promise<LeanDocument<IUser>> {
    return this.model.findByIdAndUpdate(_id, update).lean().exec();
  }

  async deleteUser(_id: string): Promise<LeanDocument<IUser>> {
    return this.model.findByIdAndDelete(_id).lean().exec();
  }
}
