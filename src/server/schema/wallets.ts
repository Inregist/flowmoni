import { InferModel } from 'drizzle-orm';
import {
  int,
  mysqlTable,
  serial,
  varchar,
} from 'drizzle-orm/mysql-core';
import { z } from 'zod';

export const wallets = mysqlTable('wallets', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  currency: varchar('currency', { length: 20 }).notNull().default('THB'),
  balance: int('balance').notNull(),
  type: varchar('type', { length: 20 }).notNull(),
  icon: varchar('icon', { length: 255 }),
  templateId: int('template_id').notNull(),
});
export type Wallet = InferModel<typeof wallets>;
export type WalletInput = InferModel<typeof wallets, 'insert'>;

export const WalletEnum = z.enum(['basic','credit']);
