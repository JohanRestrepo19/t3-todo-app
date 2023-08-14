import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { Priority, Status } from '@prisma/client'

export const createTodoSchema = z.object({
  title: z.string().min(10),
  description: z.string().optional(),
  priority: z.nativeEnum(Priority).optional(),
  targetDate: z.date().optional(),
  status: z.nativeEnum(Status).optional(),
  categories: z.array(z.string()).optional(),
  assignedTo: z.array(z.string()).optional()
})

//TODO: Make every procedure a protected one
export const todosRouter = createTRPCRouter({
  create: publicProcedure.input(createTodoSchema).mutation(opts => {
    const { input } = opts
    console.log(input)
    return { input }
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    const todos = ctx.prisma.todo.findMany()
    return { todos }
  }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const todo = await ctx.prisma.todo.findFirst({ where: { id: input } })
    return { todo }
  })
})
