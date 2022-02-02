import { BaseApiError } from 'models';

export default class Unexpected extends BaseApiError {
  constructor() {
    super({ message: 'Unexpected internal error' }, 500);
  }
}
