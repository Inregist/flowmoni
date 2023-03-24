import {
  InferModel,
  mysqlTable,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable(
  'users',
  {
    id: varchar('id', { length: 36 }).notNull().primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
    username: varchar('username', { length: 50 }).notNull(),
    password: varchar('password', { length: 100 }),
    email: varchar('email', { length: 50 }),
    emailVerified: varchar('emailVerified', { length: 50 }),
    image: varchar('image', { length: 512 }),
  },
  (table) => ({
    usernameUniq: uniqueIndex('username_unique').on(table.username),
  }),
);
export type User = InferModel<typeof users>;
export type UserInput = InferModel<typeof users, 'insert'>;
