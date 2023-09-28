import { z } from 'zod'
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from '@/server/api/trpc'
import { Priority } from '@prisma/client'
import { createTodoSchema } from '@/utils/schemas'

//TODO: Make every procedure a protected one
export const todosRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createTodoSchema)
    .mutation(async ({ ctx, input }) => {
      console.log(input)
      const todo = await ctx.prisma.todo.create({
        data: {
          title: input.title,
          description: input.description,
          targetDate: input.targetDate,
          categoryId: input.categoryId,
          createdById: ctx.session.user.id
        }
      })

      return todo
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    const todos = ctx.prisma.todo.findMany()
    return todos
  }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const todo = await ctx.prisma.todo.findFirst({ where: { id: input } })
    return todo
  }),

  getTodoPriorities: protectedProcedure.query(() => {
    return Object.values(Priority)
  })
})
