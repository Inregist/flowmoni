import {
  InferModel,
  int,
  mysqlTable,
  serial,
  varchar,
} from 'drizzle-orm/mysql-core';

export const wallets = mysqlTable('wallets', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }),
  currency: varchar('currency', { length: 20 }),
  balance: int('balance'),
  type: varchar('type', { length: 20 }),
  icon: varchar('icon', { length: 255 }),
  templateId: int('template_id'),
});
export type Wallet = InferModel<typeof wallets>;
export type WalletInput = InferModel<typeof wallets, 'insert'>;
