import { z } from 'zod'
import { Priority } from '@prisma/client'

export const todoSchema = z.object({
  title: z.string({ required_error: 'Title field is required' }),
  description: z.string().optional(),
  priority: z.nativeEnum(Priority).optional(),
  targetDate: z.date().optional(),
  // status: z.nativeEnum(Status).optional(),
  categoryId: z.string().optional()
  // assignedTo: z.array(z.string()).optional()
})

export type Todo = z.infer<typeof todoSchema>
