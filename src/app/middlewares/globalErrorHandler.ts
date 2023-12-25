/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express'
import { ZodError, ZodIssue } from 'zod'
import { TErrorDetails } from '../interface/error'
import { handleZodValidationError } from '../error/zodError'

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  // Handle Zod Validation Error
  if (error instanceof ZodError) {
    const result = handleZodValidationError(error)

    res.status(result.statusCode).json({
      success: false,
      message: result.message,
      errorMessage: result.errorMessage,
      errorDetails: result.errorDetails,
      stack: result.stack,
    })
  }

  // Handle other errors
  const statusCode = error.statusCode || 500
  const message = error.message || 'Something went wrong!'

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage: error.message,
    errorDetails: error,
    stack: error.stack,
  })
}
