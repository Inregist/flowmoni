// string id
// string userId
// string type
// string provider
// string providerAccountId
// string refreshToken
// string accessToken
// int expiresAt
// string tokenType
// string scope
// string idToken
// string sessionState
// string oauthTokenSecret
// string oauthToken

import {
  InferModel,
  int,
  mysqlTable,
  serial,
  varchar,
} from 'drizzle-orm/mysql-core';

export const accounts = mysqlTable('accounts', {
  id: serial('id').primaryKey(),
  userId: varchar('userId', { length: 36 }),
  type: varchar('type', { length: 255 }),
  provider: varchar('provider', { length: 255 }),
  providerAccountId: varchar('providerAccountId', { length: 255 }),
  refreshToken: varchar('refresh_token', { length: 255 }),
  accessToken: varchar('access_token', { length: 255 }),
  expiresAt: int('expires_at'),
  tokenType: varchar('token_type', { length: 255 }),
  scope: varchar('scope', { length: 255 }),
  idToken: varchar('id_token', { length: 255 }),
  sessionState: varchar('session_state', { length: 255 }),
  oauthTokenSecret: varchar('oauth_token_secret', { length: 255 }),
  oauthToken: varchar('oauth_token', { length: 255 }),
});
export type Account = InferModel<typeof accounts>;
export type AccountInput = InferModel<typeof accounts, 'insert'>;
