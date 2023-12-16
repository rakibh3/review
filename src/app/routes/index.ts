import { Router } from 'express'
import { CourseRoute } from '../modules/course/course.route'
import { CategoryRouter } from '../modules/category/category.route'

const router = Router()

router.use(CourseRoute)
router.use(CategoryRouter)

export default router
