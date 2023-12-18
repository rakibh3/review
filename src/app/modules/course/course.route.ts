import express from 'express'
import { CourseController } from './course.controller'

const router = express.Router()

router.post('/course', CourseController.createCourse)
router.get('/courses', CourseController.getAllCourse)
router.get('/course/best', CourseController.getBestCourses)

export const CourseRoute = router
