export class ApiError extends Error {
  statusCode: number;
  message: string;

  constructor(status: number, msg: string) {
    super(msg);
    this.message = msg;
    this.statusCode = status;
  }
}
