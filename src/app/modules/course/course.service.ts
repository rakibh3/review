import { pagination } from '../../utils/pagination'
import { TCourse } from './course.interface'
import { Course } from './course.model'

const createCourseIntoDatabase = async (payLoad: TCourse) => {
  const result = await Course.create(payLoad)
  return result
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const getAllCourseFromDatabase = async (queryParams: any) => {
  const coursesQuery = Course.find()
  const paginatedCoursesQuery = pagination(coursesQuery, queryParams)
  return paginatedCoursesQuery
}

export const CourseServices = {
  createCourseIntoDatabase,
  getAllCourseFromDatabase,
}
