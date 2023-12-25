import * as z from 'zod'

// Define Zod schemas
const tagvalidationSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean(),
})

const detailsValidationSchema = z.object({
  level: z.string(),
  description: z.string(),
})

export const courseValidationSchema = z.object({
  title: z.string(),
  instructor: z.string(),
  categoryId: z.string(),
  price: z.number().min(0),
  tags: z.array(tagvalidationSchema),
  startDate: z.string(),
  endDate: z.string(),
  language: z.string(),
  provider: z.string(),
  durationInWeeks: z.number().optional(),
  details: detailsValidationSchema,
})

// const parsedCourse = CourseSchema.parse(exampleCourseData);
// If the data doesn't conform to the schema, Zod will throw an error
