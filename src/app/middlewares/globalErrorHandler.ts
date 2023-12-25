/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express'
import { ZodError, ZodIssue } from 'zod'
import { TErrorDetails } from '../interface/error'

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  // Handle Zod Validation Error
  if (error instanceof ZodError) {
    const statusCode = 400
    const message = 'Validation Error'

    const capitalizeFirstLetter = (str: string) => {
      return str.replace(/\b\w/g, (char) => char.toUpperCase())
    }

    const errorMessages: TErrorDetails = error.issues.map((issue: ZodIssue) => {
      const path =
        issue.path.length > 0 ? issue.path[issue.path.length - 1] : ''
      return {
        path: capitalizeFirstLetter(path as string),
        message: capitalizeFirstLetter(issue.message),
      }
    })

    const errorMessage = errorMessages
      .map((error) => `${error.path} ${error.message}`)
      .join('. ')

    return res.status(statusCode).json({
      success: false,
      message,
      errorMessage: errorMessage,
      errorDetails: error,
      stack: error.stack,
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
