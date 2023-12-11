import { Router } from 'express'
import { CourseRoute } from '../modules/course/course.route'

const router = Router()

router.use(CourseRoute)

export default router
