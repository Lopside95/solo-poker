import { TRPCError, initTRPC } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import superjson from "superjson";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { NextResponse } from "next/server";
import { getServerAuthSession } from "./auth";
import { createTRPCClient } from "@trpc/client";
import { prisma } from "@/pages/api/trpc/db";

type PokerContextOptions = {
  session: Session | null;
};

const createInnerContext = (opts: PokerContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  //   const res = new NextResponse();

  const session = await getServerAuthSession({ req, res });

  return createInnerContext({
    session,
  });
};

// const t = initTRPC.context<typeof createTRPCContext>().create({
//   transformer: superjson,
//   errorFormatter({ shape }) {
//     return shape;
//   },
// });

const t = initTRPC.context<typeof createTRPCContext>().create();

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

const enforceAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceAuthed);

const enforceAdmin = t.middleware(async ({ ctx, next }) => {
  const isAdmin = ctx.session?.user.role === "ADMIN";

  if (ctx.session?.user && !isAdmin) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You need to be an admin to get in",
    });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session?.user },
    },
  });
});

export const adminProcedure = t.procedure.use(enforceAdmin);

// const t = initTRPC.create();

// export const router = t.router;
// export const publicProcedure = t.procedure;

// import { initTRPC, TRPCError } from "@trpc/server";

// // import { NewTRPCContext } from "./context/context";

// import superjson from "superjson";

// type ContextOptions = {
//   session;
// };

// const t = initTRPC.context<NewTRPCContext>().create({
//   transformer: superjson,

//   errorFormatter({ shape }) {
//     return shape;
//   },
// });

// // const t = initTRPC.context<NewTRPCContext>().create();

// export const router = t.router;
// export const publicProcedure = t.procedure;
