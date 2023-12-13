/* eslint-disable @typescript-eslint/no-explicit-any */
import { Query } from 'mongoose'

type ModelQuery<T> = Query<T[], T>
type QueryRecord = Record<string, unknown>

export const pagination = (
  modelQuery: ModelQuery<any>,
  query: QueryRecord,
): ModelQuery<any> => {
  const page = Number(query?.page) || 1
  const limit = Number(query?.limit) || 10
  const skip = (page - 1) * limit

  return modelQuery.skip(skip).limit(limit)
}
