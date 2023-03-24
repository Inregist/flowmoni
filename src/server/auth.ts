import CredentialsProvider from 'next-auth/providers/credentials';
import { type GetServerSidePropsContext } from 'next';
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
  DefaultUser,
  User,
} from 'next-auth';
import { drizzle } from './db';
import { users } from './schema/users';
import { and, eq } from 'drizzle-orm/expressions';
import { env } from '@flowmoni/env.mjs';
import { DefaultJWT } from 'next-auth/jwt';
import { compare } from 'bcrypt';
import { z } from 'zod';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface User extends DefaultUser {
    id?: string;
    name?: string;
    username?: string;
  }
  interface JWT extends DefaultJWT {
    user: User;
  }
  interface Session extends DefaultSession {
    user: User;
    token: JWT;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  // adapter: PrismaAdapter(prisma), //TODO: Change to drizzle adapter
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'password',
        },
      },
      async authorize(credentials, req) {
        // parse credentials with zod
        const credentialsSchema = z.object({
          username: z.string().nonempty().trim(),
          password: z.string().nonempty().trim(),
        });

        const parsedCredentials = credentialsSchema.parse(credentials);

        const userDB = (
          await drizzle
            .select({
              id: users.id,
              name: users.name,
              username: users.username,
              password: users.password,
            })
            .from(users)
            .where(eq(users.username, credentials?.username ?? ''))
        )[0];

        if (!userDB || !userDB.password) {
          throw new Error('Invalid username or password');
        }

        const { password, ...user } = userDB;
        const isValidPassword = await compare(
          parsedCredentials.password,
          password,
        );

        if (isValidPassword) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          throw new Error('Invalid username or password');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: env.NEXTAUTH_SECRET,
  jwt: {
    secret: env.NEXTAUTH_JWT_SECRET,
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
