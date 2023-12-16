import express from 'express'
import { CategoryController } from './category.controller'

const router = express.Router()

// Router for creating a new category
router.post('/categories', CategoryController.createCategory)
router.get('/categories', CategoryController.getAllCategory)

export const CategoryRouter = router
