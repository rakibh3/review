import express from 'express'
import { CourseController } from './course.controller'

const router = express.Router()

router.post('/course', CourseController.createCourse)
router.get('/courses', CourseController.getAllCourse)

export const CourseRoute = router
