import { env } from '@flowmoni/env.mjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { renderTrpcPanel } from 'trpc-panel';
import { appRouter } from '../../server/api/root';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  // protect in production
  if (process.env.NODE_ENV !== 'development') {
    res.status(404).send('Not found');
    return;
  }

  res.status(200).send(
    renderTrpcPanel(appRouter, {
      url: 'http://localhost:3000/api/trpc',
      transformer: 'superjson',
    }),
  );
}
