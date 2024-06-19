import { TRPCError } from "@trpc/server";

export const handleRouterError = (error: unknown) => {
  if (error instanceof TRPCError) {
    throw new TRPCError({
      code: error.code,
      message: error.message,
    });
  } else {
    throw error;
  }
};
