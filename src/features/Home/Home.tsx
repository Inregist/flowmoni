import { Layout } from '@flowmoni/components/Layout';
import { signOut } from 'next-auth/react';

export const Home = () => {
  return (
    <Layout>
      <button
        className="rounded bg-slate-500 py-2 px-4 font-bold text-white hover:bg-slate-700"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </Layout>
  );
};
