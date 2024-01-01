import { Response } from "express";

interface SuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  paginationInfo?: any;
}

interface ErrorResponse<T> {
  success: false;
  message: string;
  error: T;
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse<T>;

export const sendResponse = <T>(
  res: Response,
  message: string,
  data: T,
  paginationInfo: any = null,
  statusCode = 200
): Response<ApiResponse<T>> =>
  res.status(statusCode).json({
    success: true,
    message,
    data,
    paginationInfo,
  });

export const sendError = <T>(
  res: Response,
  message: string,
  statusCode = 500,
  error: T
): Response<ApiResponse<T>> =>
  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
