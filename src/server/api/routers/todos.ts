import { z } from 'zod'
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from '@/server/api/trpc'
import { Priority, Status } from '@prisma/client'
import { setTimeout } from 'timers/promises'

//TODO: Make every procedure a protected one
export const todosRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(10),
        description: z.string().optional(),
        priority: z.nativeEnum(Priority).optional(),
        targetDate: z.date().optional(),
        status: z.nativeEnum(Status).optional(),
        categories: z.array(z.string()).optional(),
        assignedTo: z.array(z.string()).optional()
      })
    )
    .mutation(opts => {
      const { input } = opts
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

  getTodoPriorities: protectedProcedure.query(async () => {
    const priorities = Object.values(Priority)
    //TODO: Remove nextline
    await setTimeout(5000)
    console.log('Priorities: ', priorities)
    return priorities
  })
})
