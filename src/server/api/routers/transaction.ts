import {
  createTRPCRouter,
  protectedProcedure,
} from '@flowmoni/server/api/trpc';
import {
  insertTransactionSchema,
  transactions,
} from '@flowmoni/server/schema/transactions';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const transactionBaseField = {
  id: transactions.id,
  type: transactions.type,
  walletId: transactions.walletId,
  categoryId: transactions.categoryId,
  amount: transactions.amount,
  note: transactions.note,
  date: transactions.date,
  paidWithWalletId: transactions.paidWithWalletId,
  paidWithCategoryId: transactions.paidWithCategoryId,
  paidWithNote: transactions.paidWithNote,
  isExcludeFromReport: transactions.isExcludeFromReport,
};

export const transactionRouter = createTRPCRouter({
  createTransaction: protectedProcedure
    .input(insertTransactionSchema)
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.drizzle.insert(transactions).values(input);
      return res;
    }),

  getTransactions: protectedProcedure
    .input(z.object({}))
    .query(async ({ ctx }) => {
      const res = await ctx.drizzle
        .select(transactionBaseField)
        .from(transactions);

      return res;
    }),

  getTransactionById: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const res = await ctx.drizzle
        .select(transactionBaseField)
        .from(transactions)
        .where(eq(transactions.id, input.id));

      if (res.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Transaction not found',
        });
      }

      return res[0];
    }),

  updateTransactionById: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        payload: insertTransactionSchema.partial(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await transactionRouter
        .createCaller(ctx)
        .getTransactionById({ id: input.id });

      const res = await ctx.drizzle
        .update(transactions)
        .set(JSON.parse(JSON.stringify(input.payload)))
        .where(eq(transactions.id, input.id));

      return res;
    }),

  deleteTransactionById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await transactionRouter
        .createCaller(ctx)
        .getTransactionById({ id: input.id });

      await ctx.drizzle
        .delete(transactions)
        .where(eq(transactions.id, input.id));

      return input.id;
    }),
});
