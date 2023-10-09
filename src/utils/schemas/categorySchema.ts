import { z } from 'zod'

export const createCategorySchema = z.object({
  name: z
    .string({ required_error: 'Category name is required.' })
    .min(3, 'Name must have at least 3 characters')
})

export type CreateCategory = z.infer<typeof createCategorySchema>
