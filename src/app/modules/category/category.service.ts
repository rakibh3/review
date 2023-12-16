import { TCategory } from './category.interface'
import { Category } from './category.model'

const createCategoryIntoDatabase = async (payLoad: TCategory) => {
  const result = await Category.create(payLoad)
  return result
}

export const CategoryServices = {
  createCategoryIntoDatabase,
}
