import { z } from 'zod'
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from '@/server/api/trpc'
import { Priority } from '@prisma/client'
import { todoSchema } from '@/utils/schemas'

//TODO: Make every procedure a protected one
export const todosRouter = createTRPCRouter({
  create: publicProcedure.input(todoSchema).mutation(({ input }) => {
    console.log(input)
    return input
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
