export class BaseApiError {
  public readonly message: Record<string, any>;
  public readonly status: number;
  public readonly info?: string | Record<string, any>;
  constructor(message: Record<string, any> | any, status: number) {
    this.status = status;
    this.message = message;
  }
}
