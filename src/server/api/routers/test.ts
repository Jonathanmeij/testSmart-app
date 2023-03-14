import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const testRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.test.findMany();
  }),
});