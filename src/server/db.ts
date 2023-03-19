import { env } from '@flowmoni/env.mjs';

import { drizzle as drizzle_orm, MySql2Database } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const globalForDrizzle = globalThis as unknown as {
  drizzle: MySql2Database;
};

const mysqlPoolConnection = mysql.createPool(env.DATABASE_URL);
export const drizzle = drizzle_orm(mysqlPoolConnection);

if (env.NODE_ENV !== 'production') globalForDrizzle.drizzle = drizzle;
