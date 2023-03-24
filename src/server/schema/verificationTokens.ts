import {
  InferModel,
  mysqlTable,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core';

export const verificationTokens = mysqlTable(
  'verification_tokens',
  {
    identifier: varchar('identifier', { length: 255 }),
    token: varchar('token', { length: 255 }),
    expires: timestamp('expires'),
  },
  (table) => {
    return {
      uniqToken: uniqueIndex('unique_token').on(table.token),
      uniqIdentToken: uniqueIndex('unique_ident_token').on(
        table.identifier,
        table.token,
      ),
    };
  },
);
export type VerificationToken = InferModel<typeof verificationTokens>;
export type VerificationTokenInput = InferModel<
  typeof verificationTokens,
  'insert'
>;
