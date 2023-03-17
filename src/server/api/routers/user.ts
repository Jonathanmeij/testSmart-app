import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  addTestToUser: protectedProcedure
    .input(
      z.object({ testId: z.string(), time: z.number(), correct: z.number() })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.testHistory.create({
        data: {
          time: input.time,
          correct: input.correct,
          test: { connect: { id: input.testId } },
          user: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
});
