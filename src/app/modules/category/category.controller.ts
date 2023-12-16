/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { sendResponse } from '../../utils/sendResponse'
import { CategoryServices } from './category.service'

// Creates a new category
const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { ...name } = req.body
    const result = await CategoryServices.createCategoryIntoDatabase(name)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Category created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// Gets all categories
const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await CategoryServices.getAllCategoryFromDatabase()

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Categories retrieved successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// Exports all controllers
export const CategoryController = {
  createCategory,
  getAllCategory,
}
