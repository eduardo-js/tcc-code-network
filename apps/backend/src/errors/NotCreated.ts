import { BaseApiError } from 'models';

export default class NotCreated extends BaseApiError {
  constructor() {
    super({ message: 'Resource not created' }, 424);
  }
}
