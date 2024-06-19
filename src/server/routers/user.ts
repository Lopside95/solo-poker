import { userSchema } from "@/types/user";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { prisma } from "@/pages/api/trpc/db";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(userSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await prisma.user.create({
          data: {
            username: input.username,
            email: input.email,
            password: input.password,
            image: "",
            role: "USER",
          },
        });
      } catch (error) {
        console.error(error);
        if (error instanceof TRPCError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        }
      }
    }),
  getUserById: protectedProcedure.query(async ({ ctx }) => {
    const userDeets = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });

    if (!userDeets) {
      console.log("can't find");
    }

    return userDeets;
  }),
});
