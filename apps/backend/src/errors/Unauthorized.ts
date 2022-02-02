import { BaseApiError } from 'models';

export default class Unauthorized extends BaseApiError {
  constructor() {
    super({ message: 'Unauthorized access' }, 401);
  }
}
