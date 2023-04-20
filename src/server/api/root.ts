import { createTRPCRouter } from '@flowmoni/server/api/trpc';
import { exampleRouter } from '@flowmoni/server/api/routers/example';
import { authRouter } from './routers/auth';
import { transactionRouter } from './routers/transaction';
import { categoryRouter } from './routers/category';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  auth: authRouter,
  transaction: transactionRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
