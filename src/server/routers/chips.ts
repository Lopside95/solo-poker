import { chipsSchema } from "@/types/chips";
import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import { prisma } from "@/pages/api/trpc/db";
import { handleRouterError } from "@/utils/utils";

export const chipsRouter = createTRPCRouter({
  createChips: adminProcedure
    .input(chipsSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        await prisma.chips.create({
          data: {
            color: input.color,
            value: input.value,
            startingAmount: input.startingAmount,
          },
        });
      } catch (error) {
        console.error(error);
        handleRouterError(error);
      }
    }),
});
