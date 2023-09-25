import { z } from 'zod'
import { Priority } from '@prisma/client'

export const todoSchema = z.object({
  title: z.string({ required_error: 'Title field is required' }),
  description: z.string().nullable(),
  priority: z.nativeEnum(Priority).nullable(),
  targetDate: z.coerce.date().nullable(),
  categoryId: z.string().cuid().nullable()
})

export type Todo = z.infer<typeof todoSchema>
