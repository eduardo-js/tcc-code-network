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

  async findById(_id: string, query = {}): Promise<LeanDocument<IUser>> {
    return this.model.findById(_id, query);
  }
  async findByIdAndUpdate(_id: string, update: UpdateQuery<IUser>): Promise<LeanDocument<IUser>> {
    return this.model.findByIdAndUpdate(_id, update).lean().exec();
  }
  async findOneAndUpdate(searchQuery = {}, update: UpdateQuery<IUser>): Promise<LeanDocument<IUser>> {
    return this.model.findOneAndUpdate(searchQuery, update).lean().exec();
  }
  async findOne(_id: string, searchQuery = {}): Promise<LeanDocument<IUser>> {
    return this.model.findOne({ _id }, searchQuery).lean().exec();
  }

  async deleteUser(_id: string): Promise<LeanDocument<IUser>> {
    return this.model.findByIdAndDelete(_id).lean().exec();
  }
}
