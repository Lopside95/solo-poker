import { createNextApiHandler } from "@trpc/server/adapters/next";

import { appRouter } from "@/server/root";
import { createTRPCContext } from "@/server/trpc";
import { env } from "process";

export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  // onError:
  //   env.NODE_ENV === "development"
  //     ? ({ path, error }) => {
  //         console.error(
  //           `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
  //         );
  //       }
  //     : undefined,
});

// import { appRouter } from "@/server/root";
// import { createTRPCContext } from "@/server/trpc";
// import * as trpcNext from "@trpc/server/adapters/next";

// export default trpcNext.createNextApiHandler({
//   router: appRouter,
//   createContext: createTRPCContext,
// });
