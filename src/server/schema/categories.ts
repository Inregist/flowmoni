import { InferModel } from 'drizzle-orm';
import {
  int,
  mysqlTable,
  serial,
  varchar,
} from 'drizzle-orm/mysql-core';

export const categories = mysqlTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 20 }).notNull(),
  level: int('level').notNull().default(0),
  icon: varchar('icon', { length: 255 }),
  parentId: int('parent_id'),
});
export type Category = InferModel<typeof categories>;
export type CategoryInput = InferModel<typeof categories, 'insert'>;
