import {
  InferModel,
  int,
  mysqlTable,
  serial,
  varchar,
} from 'drizzle-orm/mysql-core';
import { categories } from './categories';

export const transactions = mysqlTable('transactions', {
  id: serial('id').primaryKey(),
  walletId: int('wallet_id'),
  categoryId: int('category_id'),
  paidWithWalletId: int('paid_with_wallet_id'),
  paidWithCategoryId: int('paid_with_category_id'),
  amount: int('amount').notNull(),
  note: varchar('note', { length: 255 }),
  isExcludeFromReport: int('is_exclude_from_report'),
});
export type Transaction = InferModel<typeof transactions>;
export type TransactionInput = InferModel<typeof transactions, 'insert'>;
