import { setTimeout } from 'timers/promises'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const categoriesRouter = createTRPCRouter({
  getAllByUserId: protectedProcedure.query(async ({ ctx }) => {
    const categories = await ctx.prisma.category.findMany({
      where: { createdById: ctx.session.user.id }
    })

    //TODO: Remove nextline
    // await setTimeout(3000)

    console.log('Categories: ', categories)
    return categories
  })
})
