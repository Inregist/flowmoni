import { z } from 'zod';
import { genSalt, hash } from 'bcrypt';

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '@flowmoni/server/api/trpc';
import { wallets } from '@flowmoni/server/schema';
import { users } from '@flowmoni/server/schema/users';
import cuid from 'cuid';
import { env } from '@flowmoni/env.mjs';
import { eq } from 'drizzle-orm/expressions';

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z
        .object({
          username: z.string().nonempty().trim(),
          password: z.string().min(8).trim(),
          confirmPassword: z.string().min(8).trim(),
        })
        .refine((data) => data.password === data.confirmPassword),
    )
    .mutation(async ({ ctx, input }) => {
      const [isExists] = await ctx.drizzle
        .select({ id: users.id })
        .from(users)
        .where(eq(users.username, input.username));

      if (isExists) {
        throw new Error('Username already exists');
      }

      await ctx.drizzle.insert(users).values({
        id: cuid(),
        name: input.username,
        username: input.username,
        password: await hash(input.password, 10),
      });

      return {
        isSuccess: true,
        message: 'User created successfully',
        data: {
          username: input.username,
        }
      };
    }),
});
