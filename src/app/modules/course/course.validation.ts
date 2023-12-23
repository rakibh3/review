// Zod validation

import * as z from 'zod'

export const courseValidationSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  price: z.number().min(0),
  duration: z.number().min(0),
  isActive: z.boolean(),
})

export const courseUpdateValidationSchema = z.object({
  name: z.string().min(3).max(255).optional(),
  description: z.string().min(3).max(255).optional(),
  price: z.number().min(0).optional(),
  duration: z.number().min(0).optional(),
  isActive: z.boolean().optional(),
})

export const courseTagValidationSchema = z.object({
  name: z.string().min(3).max(255),
  isDeleted: z.boolean(),
})

export const courseTagUpdateValidationSchema = z.object({
  name: z.string().min(3).max(255).optional(),
  isDeleted: z.boolean().optional(),
})

export const courseDetailsValidationSchema = z.object({
  language: z.string().min(3).max(255),
  provider: z.string().min(3).max(255),
  durationInWeeks: z.number().min(0),
  startDate: z.date(),
  endDate: z.date(),
})

export const courseDetailsUpdateValidationSchema = z.object({
  language: z.string().min(3).max(255).optional(),
  provider: z.string().min(3).max(255).optional(),
  durationInWeeks: z.number().min(0).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
})

export const courseReviewValidationSchema = z.object({
  rating: z.number().min(0).max(5),
  comment: z.string().min(3).max(255),
})
