import { createCategorySchema } from '@/utils/schemas'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const categoriesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createCategorySchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const category = await ctx.prisma.category.create({
          data: { name: input.name, createdById: ctx.session.user.id }
        })

        return category
      } catch {
        throw new TRPCError({
          message: `Name "${input.name}" already exists`,
          code: 'BAD_REQUEST'
        })
      }
    }),
  getAllByUserId: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany({
      where: { createdById: ctx.session.user.id }
    })
  }),
})
