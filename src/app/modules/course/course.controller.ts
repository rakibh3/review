import { NextFunction, Request, Response } from 'express'
import { CourseServices } from './course.service'
import { sendResponse } from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { calculateDurationInWeeks } from '../../utils/calculateDurationInWeeks'

//  Creates a new course.

const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { ...course } = req.body

    // Calculate duration in weeks
    const durationInWeeks = calculateDurationInWeeks(
      course.startDate,
      course.endDate,
    )

    const result = await CourseServices.createCourseIntoDatabase({
      ...course,
      durationInWeeks,
    })

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Course created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getAllCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { ...queryParams } = req.query
    const allCourse = await CourseServices.getAllCourseFromDatabase(queryParams)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Courses retrieved successfully',
      data: allCourse,
    })
  } catch (error) {
    next(error)
  }
}

export const CourseController = {
  createCourse,
  getAllCourse,
}
