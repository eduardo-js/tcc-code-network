import axios, { AxiosError, AxiosResponse } from 'axios';
import { IUser, ICourse, AuthResponse, IJob, ITest } from 'models';

export const apiService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-type': 'application/json;charset=utf-8', Accept: 'application/json;charset=utf-8' },
});

apiService.interceptors.response.use(
  (resp: AxiosResponse) => resp.data,
  (err: AxiosError) => {
    throw new Error(err.response?.statusText);
  },
);
class ApiService {
  static getUser = (_id: string): Promise<IUser> => apiService.get(`/v1/user/${_id}`);
  static registerUser = (data: Partial<IUser>) => apiService.post('user/create', data);
  static getCourses = (): Promise<ICourse[]> => apiService.get(`course/`);
  static getCourse = (_id: string): Promise<ICourse> => apiService.get(`course/${_id}`);
  static createCourse = (courseData: Partial<ICourse>): Promise<ICourse> =>
    apiService.post(`course/create`, courseData);
  static getJobs = (): Promise<IJob[]> => apiService.get('job/');
  static getJob = (_id: string): Promise<IJob> => apiService.get(`job/${_id}`);
  static getTests = (): Promise<ITest[]> => apiService.get('tests/');
  static patchUser = (update: Partial<IUser>) => apiService.patch('user/', update);
  static login = async (data: Partial<IUser>): Promise<AuthResponse> => await apiService.post('/v1/user/login', data);
  static playVideo = async (_id: string) => await apiService.get(`upload/${_id}`);
  static uploadVideo = async (file: FormData) =>
    await apiService.post(`upload/`, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
}

export default ApiService;
