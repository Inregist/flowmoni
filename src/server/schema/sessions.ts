import { InferModel } from 'drizzle-orm';
import {
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

export const sessions = mysqlTable('sessions', {
  id: serial('id').primaryKey(),
  userId: varchar('userId', { length: 36 }),
  expires: timestamp('expires'),
  sessionToken: varchar('sessionToken', { length: 255 }),
});
export type Session = InferModel<typeof sessions>;
export type SessionInput = InferModel<typeof sessions, 'insert'>;
