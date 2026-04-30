export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const isAppError = (error: unknown): error is AppError =>
  error instanceof AppError;
