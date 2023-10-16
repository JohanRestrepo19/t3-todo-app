import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { createTodoSchema } from '@/utils/schemas'
import { Priority } from '@prisma/client'
import { z } from 'zod'

export const todosRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createTodoSchema)
    .mutation(async ({ ctx, input }) => {
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
        categoryId: true,
        category: true
      },
      orderBy: { status: 'asc' }
    })

    return todos.map(todo => ({
      ...todo,
      targetDate: todo.targetDate?.toJSON()
    }))
  }),

  getById: protectedProcedure
    .input(z.string().cuid())
    .query(async ({ ctx, input }) => {
      const todo = await ctx.prisma.todo.findFirst({ where: { id: input } })
      return todo
    }),

  deleteById: protectedProcedure
    .input(z.string().cuid())
    .mutation(async ({ ctx, input }) => {
      const deletedTodo = await ctx.prisma.todo.delete({
        where: { id: input }
      })

      return deletedTodo
    }),

  markAsDoneById: protectedProcedure
    .input(z.string().cuid())
    .mutation(async ({ ctx, input }) => {
      const updatedTodo = await ctx.prisma.todo.update({
        where: { id: input },
        data: { status: 'DONE', updatedAt: new Date() }
      })
      return updatedTodo
    }),
  markAsPendingById: protectedProcedure
    .input(z.string().cuid())
    .mutation(async ({ ctx, input }) => {
      const updatedTodo = await ctx.prisma.todo.update({
        where: { id: input },
        data: { status: 'PENDING', updatedAt: new Date() }
      })
      return updatedTodo
    }),
  getTodoPriorities: protectedProcedure.query(() => {
    return Object.values(Priority)
  })
})
