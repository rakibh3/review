/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { sendResponse } from '../../utils/sendResponse'
import { CategoryServices } from './category.service'

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

export const CategoryController = {
  createCategory,
}
