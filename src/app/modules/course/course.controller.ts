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

// Get best courses based on reviews rating average
const getBestCourses = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await CourseServices.getBestCoursesFromDatabase()
    const bestCourse = result[0] || {}
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Best course retrieved successfully',
      data: {
        course: {
          _id: bestCourse._id,
          title: bestCourse.title,
          instructor: bestCourse.instructor,
          categoryId: bestCourse.categoryId,
          price: bestCourse.price,
          tags: bestCourse.tags,
          startDate: bestCourse.startDate,
          endDate: bestCourse.endDate,
          language: bestCourse.language,
          provider: bestCourse.provider,
          durationInWeeks: bestCourse.durationInWeeks,
          details: bestCourse.details,
        },
        averageRating: bestCourse.averageRating,
        reviewCount: bestCourse.reviewCount,
      },
    })
  } catch (error) {
    next(error)
  }
}

// Update a course dynamiclly
const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { courseId } = req.params
    const upatingData = req.body
    const result = await CourseServices.updateCourseIntoDatabase(
      courseId,
      upatingData,
    )

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Course updated successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// Exports all controllers
export const CourseController = {
  createCourse,
  getAllCourse,
  getBestCourses,
  updateCourse,
}
