import { createTRPCRouter, protectedProcedure } from '../trpc'

export const categoriesRouter = createTRPCRouter({
  getAllByUserId: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany({
      where: { createdById: ctx.session.user.id }
    })
  })
})
