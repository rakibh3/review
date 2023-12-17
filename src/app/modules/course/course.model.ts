import { Schema, model } from 'mongoose'
import { TCourse, TDetails, TTag } from './course.interface'

const TagSchema = new Schema<TTag>(
  {
    name: { type: String, required: true },
    isDeleted: { type: Boolean, required: true },
  },
  { _id: false },
)

const DetailsSchema = new Schema<TDetails>(
  {
    level: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false },
)

// Creating Mongoose schema
const courseSchema = new Schema<TCourse>({
  title: { type: String, required: true }, // need to add  unique: true
  instructor: { type: String, required: true, ref: 'Category' },
  categoryId: { type: Schema.Types.ObjectId, required: true },
  price: { type: Number, required: true },
  tags: { type: [TagSchema], required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  language: { type: String, required: true },
  provider: { type: String, required: true },
  durationInWeeks: { type: Number, required: true },
  details: { type: DetailsSchema, required: true },
})

export const Course = model<TCourse>('Course', courseSchema)
