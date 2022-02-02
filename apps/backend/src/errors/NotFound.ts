import { BaseApiError } from 'models';

export default class NotFound extends BaseApiError {
  constructor() {
    super({ message: 'Resource not found' }, 404);
  }
}
