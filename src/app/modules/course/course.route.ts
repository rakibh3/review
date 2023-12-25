import express from 'express'
import { CourseController } from './course.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { courseValidationSchema } from './course.validation'

const router = express.Router()

router.post(
  '/course',
  validateRequest(courseValidationSchema),
  CourseController.createCourse,
)
router.get('/courses', CourseController.getAllCourse)
router.get('/course/best', CourseController.getBestCourses)
router.put('/courses/:courseId', CourseController.updateCourse)

export const CourseRoute = router
