import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const testRouter = createTRPCRouter({
  getFeatured: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.test.findMany({
      where: {
        featured: true,
      },
    });
  }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.test.findUnique({
        where: {
          id: input.id,
        },
        include: {
          questions: {
            include: {
              answers: true,
            },
          },
        },
      });
    }),
});
