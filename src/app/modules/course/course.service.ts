/* eslint-disable @typescript-eslint/no-explicit-any */

import { filterByUtils } from '../../utils/filter'
import { sortByUtils, sortOrderUtils } from '../../utils/sort'
import { TCourse } from './course.interface'
import { Course } from './course.model'

const createCourseIntoDatabase = async (payLoad: TCourse) => {
  const result = await Course.create(payLoad)
  return result
}

const getAllCourseFromDatabase = async (query: Record<string, any>) => {
  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 10

  const sortBy = sortByUtils(query.sortBy as string)
  const sortOrder = sortOrderUtils(query.sortOrder as string)

  const filterBy = filterByUtils(query)

  const courses = await Course.find(filterBy)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * limit)
    .limit(limit)

  const metaData = {
    page,
    limit,
    total: await Course.countDocuments(),
  }

  return {
    courses,
    metaData,
  }
}

export const CourseServices = {
  createCourseIntoDatabase,
  getAllCourseFromDatabase,
}
