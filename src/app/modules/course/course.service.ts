/* eslint-disable @typescript-eslint/no-explicit-any */
import { TCourse } from './course.interface'
import { Course } from './course.model'

const createCourseIntoDatabase = async (payLoad: TCourse) => {
  const result = await Course.create(payLoad)
  return result
}

const getPaginatedAndFilteredCourses = async (queryParams: any) => {
  //   const {
  //     page = 1,
  //     limit = 10,
  //     sortBy,
  //     sortOrder = 'asc',
  //     minPrice,
  //     maxPrice,
  //     tags,
  //     startDate,
  //     endDate,
  //     language,
  //     provider,
  //     durationInWeeks,
  //     level,
  //   } = queryParams

  //   // Apply pagination
  //   const offset = (page - 1) * limit

  //   // Build the filter object based on query parameters
  //   const filter: any = {}

  //   if (minPrice) {
  //     filter.price = { $gte: minPrice }
  //   }

  //   if (maxPrice) {
  //     filter.price = { ...filter.price, $lte: maxPrice }
  //   }

  //   if (tags) {
  //     filter.tags = tags
  //   }

  //   if (startDate) {
  //     filter.startDate = { $gte: startDate }
  //   }

  //   if (endDate) {
  //     filter.endDate = { $lte: endDate }
  //   }

  //   if (language) {
  //     filter.language = language
  //   }

  //   if (provider) {
  //     filter.provider = provider
  //   }

  //   if (durationInWeeks) {
  //     filter.durationInWeeks = durationInWeeks
  //   }

  //   if (level) {
  //     filter.level = level
  //   }

  //   // Apply sorting
  //   const sort: any = {}
  //   if (sortBy) {
  //     sort[sortBy] = sortOrder === 'desc' ? -1 : 1
  //   }

  // Perform the database query with pagination, filtering, and sorting
  const result = await Course.find({ queryParams })
  // .sort(sort).skip(offset).limit(limit)

  return result
}

export const CourseServices = {
  createCourseIntoDatabase,
  getPaginatedAndFilteredCourses,
}
