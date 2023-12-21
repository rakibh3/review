import express from 'express'
import { CourseController } from './course.controller'

const router = express.Router()

router.post('/course', CourseController.createCourse)
router.get('/courses', CourseController.getAllCourse)
router.get('/course/best', CourseController.getBestCourses)
router.put('/courses/:courseId', CourseController.updateCourse)

export const CourseRoute = router
