import { sign } from 'jsonwebtoken';
import { env } from '../../config';

export type IAuthService = {
  generateAuthToken(name: string, _id: string, permission: number): string;
};
export default class AuthService implements IAuthService {
  generateAuthToken(name: string, _id: string, permission: number): string {
    return sign({ name, _id, permission }, env.authSecret, { expiresIn: env.authExpirationTime });
  }
}
