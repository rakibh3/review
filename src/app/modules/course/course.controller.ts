import { NextFunction, Request, Response } from 'express'
import { CourseServices } from './course.service'
import { sendResponse } from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { calculateDurationInWeeks } from '../../utils/calculateDurationInWeeks'

//  Creates a new course
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

// Gets all courses
const getAllCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query = req.query

    const { metaData, courses } =
      await CourseServices.getAllCourseFromDatabase(query)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Courses retrieved successfully',
      meta: metaData,
      data: courses,
    })
  } catch (error) {
    next(error)
  }
}

// Exports all controllers
export const CourseController = {
  createCourse,
  getAllCourse,
}
