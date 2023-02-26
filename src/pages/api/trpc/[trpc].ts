import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "flowmoni/env.mjs";
import { createTRPCContext } from "flowmoni/server/api/trpc";
import { appRouter } from "flowmoni/server/api/root";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : undefined,
});
