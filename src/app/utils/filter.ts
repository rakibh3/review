/* eslint-disable @typescript-eslint/no-explicit-any */
export const filterByUtils = (query: any) => {
  const filter: Record<string, any> = {}

  const startDate = query.startDate
    ? new Date(query.startDate as string)
    : undefined
  const endDate = query.endDate ? new Date(query.endDate as string) : undefined
  const language = query.language as string
  const provider = query.provider as string
  const durationInWeeks = parseInt(query.durationInWeeks as string)
  const level = query.level as string

  if (query.minPrice) {
    filter.price = {
      ...filter.price,
      $gte: parseFloat(query.minPrice as string),
    }
  }

  if (query.maxPrice) {
    filter.price = {
      ...filter.price,
      $lte: parseFloat(query.maxPrice as string),
    }
  }

  if (query.tags) {
    filter.tags = {
      $elemMatch: {
        name: query.tags,
      },
    }
  }

  if (endDate) {
    filter.endDate = {
      $lte: endDate.toISOString().slice(0, 10),
    }
  }

  if (startDate) {
    filter.startDate = {
      $gte: startDate.toISOString().slice(0, 10),
    }
  }

  if (language) {
    filter.language = language
  }

  if (provider) {
    filter.provider = provider
  }

  if (durationInWeeks) {
    filter.durationInWeeks = durationInWeeks
  }

  if (level) {
    filter.level = level
  }

  return filter
}
