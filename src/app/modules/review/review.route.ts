import express from 'express'
import { ReviewController } from './review.controller'

const router = express.Router()

router.post('/reviews', ReviewController.createReview)
router.get('/courses/:coursesId/reviews', ReviewController.getAllReviews)

export const ReviewRoute = router