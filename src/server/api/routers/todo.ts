import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    const todos = ctx.prisma.todo.findMany()
    return { todos }
  }),

  todoById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const todo = await ctx.prisma.todo.findFirst({ where: { id: input } })
    return { todo }
  })
})
