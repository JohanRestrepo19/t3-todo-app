import { Priority } from '@prisma/client'
import { z } from 'zod'

export const createTodoSchema = z.object({
  title: z
    .string({ required_error: 'Title field is required' })
    .min(5, 'Title must have at least 5 characters'),
  description: z.string().nullable(),
  priority: z.nativeEnum(Priority).nullable(),
  targetDate: z.coerce.date().nullable(),
  categoryId: z.string().cuid().nullable()
})

export type CreateTodo = z.infer<typeof createTodoSchema>
