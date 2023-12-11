import { NextFunction, Request, Response } from 'express'
import { CourseServices } from './course.service'
import { sendResponse } from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { calculateDurationInWeeks } from '../../utils/calculateDurationInWeeks'

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
    const allCourse =
      await CourseServices.getPaginatedAndFilteredCourses(queryParams)
    console.log(req.query)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Courses retrieved successfully',
      data: allCourse[0],
    })
  } catch (error) {
    next(error)
  }
}

// const getAllCourse = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const { page, limit } = req.query
//     const pageNumber = parseInt(page as string) || 1
//     const pageSize = parseInt(limit as string) || 10

//     const allCourse = await CourseServices.getCoursesFromDatabase()

//     // Apply pagination
//     const startIndex = (pageNumber - 1) * pageSize
//     const endIndex = pageNumber * pageSize
//     const paginatedCourses = allCourse.slice(startIndex, endIndex)

//     // Apply filtering
//     // Assuming you have a filter function to filter the courses based on certain criteria
//     const filteredCourses = paginatedCourses.filter(() => {
//       // Add your filtering logic here
//       // Example: return course.category === 'Math';
//       return true // Replace this with your actual filtering logic
//     })

//     const totalCourses = allCourse.length

//     sendResponse(res, {
//       success: true,
//       statusCode: httpStatus.OK,
//       message: 'Courses retrieved successfully',
//       meta: {
//         page: pageNumber,
//         limit: pageSize,
//         total: totalCourses,
//       },
//       data: filteredCourses,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

export const CourseController = {
  createCourse,
  getAllCourse,
}
