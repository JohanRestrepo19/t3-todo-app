import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { Priority } from '@prisma/client'
import { createTodoSchema } from '@/utils/schemas'

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

  getAllByUserId: protectedProcedure.query(async ({ ctx }) => {
    const todos = await ctx.prisma.todo.findMany({
      where: { createdById: ctx.session.user.id },
      select: {
        id: true,
        title: true,
        description: true,
        priority: true,
        targetDate: true,
        status: true,
        categoryId: true
      }
    })
    return todos.map(todo => ({
      ...todo,
      targetDate: todo.targetDate?.toJSON()
    }))
  }),

  getById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const todo = await ctx.prisma.todo.findFirst({ where: { id: input } })
      return todo
    }),

  getTodoPriorities: protectedProcedure.query(() => {
    return Object.values(Priority)
  })
})
