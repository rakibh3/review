import { ZodError, ZodIssue } from 'zod'
import { TErrorDetails } from '../interface/error'

export const handleZodValidationError = (error: ZodError) => {
  const statusCode = 400
  const message = 'Validation Error'

  const capitalizeFirstLetter = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase())
  }

  const errorMessages: TErrorDetails = error.issues.map((issue: ZodIssue) => {
    const path = issue.path.length > 0 ? issue.path[issue.path.length - 1] : ''
    return {
      path: capitalizeFirstLetter(path as string),
      message: capitalizeFirstLetter(issue.message),
    }
  })

  const errorMessage = errorMessages
    .map((error) => `${error.path} ${error.message}`)
    .join('. ')

  return {
    statusCode,
    message,
    errorMessage,
    errorDetails: error,
    stack: error.stack,
  }
}
