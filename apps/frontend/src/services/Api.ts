import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { IUser, ICourse, AuthResponse, IJob, ITest } from 'models';

class ApiService {
  client: AxiosInstance;
  static instance = new ApiService();

  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: { 'Content-type': 'application/json;charset=utf-8', Accept: 'application/json;charset=utf-8' },
    });
    this.init();
  }
  init = () => {
    this.client.interceptors.response.use(
      (resp: AxiosResponse) => resp.data,
      (err: AxiosError) => {
        throw new Error(err.response?.statusText);
      },
    );
  };

  setBearer(token: string) {
    this.client.defaults.headers.authorization = `Bearer ${token}`;
  }

  async getUser(_id: string): Promise<IUser> {
    return await this.client.get(`/v1/user/${_id}`);
  }
  async registerUser(data: Partial<IUser>) {
    return await this.client.post('/v1/user/create', data);
  }
  async getCourses(): Promise<ICourse[]> {
    return await this.client.get(`/v1/course/`);
  }
  async getCourse(_id: string): Promise<ICourse> {
    return await this.client.get(`/v1/course/${_id}`);
  }
  async createCourse(courseData: Partial<ICourse>): Promise<ICourse> {
    return await this.client.post(`course/create`, courseData);
  }
  async getJobs(): Promise<IJob[]> {
    return await this.client.get('/v1/job/');
  }
  async getJob(_id: string): Promise<IJob> {
    return await this.client.get(`/v1/job/${_id}`);
  }
  async getTests(): Promise<ITest[]> {
    return await this.client.get('/v1/tests/');
  }
  async patchUser(update: Partial<IUser>) {
    return await this.client.patch('/v1/user/', update);
  }
  async login(data: Partial<IUser>): Promise<AuthResponse> {
    return await this.client.post('/v1/user/login', data);
  }
  async uploadVideo(file: FormData): Promise<{ videoId: string }> {
    return await this.client.post(`/v1/video/`, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}

export default ApiService.instance as ApiService;
