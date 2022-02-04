import { LeanDocument } from 'mongoose';
import { AuthService } from '../../services';
import { UserRepository } from '../../repositories';
import { CourseProgress, IUser } from 'models';
import { NotCreated, NotFound, Unauthorized } from '../../errors';
import { Utils } from '../../utils';

export type IUserService = {
  getUser(_id: string): Promise<LeanDocument<IUser>>;
  createUser(userData: IUser): Promise<void>;
  deleteUser(_id: string): Promise<LeanDocument<IUser>>;
  patchUserCourse(_id: string, courseProgress: CourseProgress): Promise<void>;
  // patchUserJob(_id: string, jobId: string): Promise<void>;
  login(_id: string, password: string): Promise<Record<string, string>>;
};

export default class UserService {
  userRepository: UserRepository;
  authService: AuthService;
  constructor() {
    this.userRepository = new UserRepository();
    this.authService = new AuthService();
  }

  async getUser(_id: string): Promise<LeanDocument<IUser>> {
    const user = await this.userRepository.findById(_id);
    return user;
  }

  async createUser(userData: IUser): Promise<void> {
    const password = await Utils.hashSensitiveInfo(userData.password);
    const user = await this.userRepository.createUser({ ...userData, password });
    if (!user) throw new NotCreated();
  }

  async deleteUser(_id: string): Promise<LeanDocument<IUser>> {
    const user = await this.userRepository.deleteUser(_id);
    return user;
  }

  async patchUser(_id: string, body: Partial<IUser>): Promise<void> {
    if (body.courses) this.patchUserCourse(_id, body.courses[0]);
  }

  async patchUserCourse(_id: string, courseProgress: CourseProgress): Promise<void> {
    const course = await this.userRepository.findOne({ _id, courses: { $elemMatch: { _id: courseProgress._id } } });
    if (!course) {
      await this.userRepository.findByIdAndUpdate(_id, { $push: { courses: { ...courseProgress } } });
      return;
    }
    await this.userRepository.findOneAndUpdate(
      { _id, 'course.$._id': courseProgress._id },
      { class: courseProgress.class, module: courseProgress.module },
    );
  }

  // async patchUserJob(_id: string, jobId: string): Promise<void> {
  //   const { jobs } = await this.userRepository.getUser(_id);
  //   const job = jobs.find(job => job._id === jobId);
  //   if (!job) {
  //     jobs.push({ _id: jobId });
  //   }
  //   await this.userRepository.patchUser(_id, { jobs });
  // }

  async login(_id: string, password: string): Promise<Record<string, string>> {
    const user = await this.userRepository.findById(_id);
    if (!user) throw new NotFound();
    if (await Utils.compareHashedInfo(password, user.password)) {
      return { token: this.authService.generateAuthToken(user.name, user._id, user.permission) };
    }
    throw new Unauthorized();
  }
}
