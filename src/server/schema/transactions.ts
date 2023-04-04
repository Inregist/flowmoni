import { InferModel } from 'drizzle-orm';
import {
  boolean,
  datetime,
  float,
  int,
  mysqlTable,
  serial,
  varchar,
} from 'drizzle-orm/mysql-core';

export const transactions = mysqlTable('transactions', {
  id: serial('id').primaryKey(),
  type: varchar('type', { length: 50 }).notNull(),
  walletId: int('wallet_id').notNull(),
  categoryId: int('category_id').notNull(),
  amount: float('amount').notNull(),
  note: varchar('note', { length: 255 }),
  date: datetime('date').notNull(),
  paidWithWalletId: int('paid_with_wallet_id'),
  paidWithCategoryId: int('paid_with_category_id'),
  paidWithNote: varchar('paid_with_note', { length: 255 }),
  isExcludeFromReport: boolean('is_exclude_from_report').default(false),
});
export type Transaction = InferModel<typeof transactions>;
export type TransactionInput = InferModel<typeof transactions, 'insert'>;
