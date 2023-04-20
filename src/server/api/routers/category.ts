import { z } from 'zod';

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '@flowmoni/server/api/trpc';
import { Category, wallets } from '@flowmoni/server/schema';

export type CategoryGroup = Category & {
  children?: CategoryGroup[];
};

export const categoryRouter = createTRPCRouter({
  hello: publicProcedure
    .meta({ description: 'Say hello to the world' })
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.drizzle.select().from(wallets);
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),
});
