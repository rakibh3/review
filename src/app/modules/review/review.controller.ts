import { NextFunction, Request, Response } from 'express'
import { sendResponse } from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { ReviewService } from './review.service'

// Create a review for a course
const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { ...review } = req.body
    const result = await ReviewService.createReviewIntoDatabase(review)

    sendResponse(res, {
      success: true,
      message: 'Review created successfully',
      statusCode: httpStatus.CREATED,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// Get all reviews for a course
const getAllReviews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const courseId = req.params.coursesId
    const result =
      await ReviewService.getAllReviewsWithCoursesFromDatabase(courseId)

    sendResponse(res, {
      success: true,
      message: 'Course and Reviews retrieved successfully',
      statusCode: httpStatus.OK,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// Export controllers
export const ReviewController = {
  createReview,
  getAllReviews,
}
