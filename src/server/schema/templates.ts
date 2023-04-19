import { InferModel } from 'drizzle-orm';
import {
  mysqlTable,
  serial,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core';

export const templates = mysqlTable('templates', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
}, (table) => {
  return {
    uniqName: uniqueIndex('unique_name').on(table.name),
  };
});
export type Template = InferModel<typeof templates>;
export type TemplateInput = InferModel<typeof templates, 'insert'>;
