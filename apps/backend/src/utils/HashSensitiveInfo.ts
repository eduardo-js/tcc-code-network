import { hash, genSalt, compare } from 'bcrypt';

import { env } from '../config';

export default class Utils {
  static async hashSensitiveInfo(info: string): Promise<string> {
    const salt = await genSalt(env.salt);
    const hashedString = await hash(info, salt);

    return hashedString;
  }

  static async compareHashedInfo(info: string, hashedInfo: string): Promise<boolean> {
    return await compare(info, hashedInfo);
  }
}
