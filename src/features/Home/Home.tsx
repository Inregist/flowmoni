import { Layout } from '@flowmoni/components/Layout';
import { signOut } from 'next-auth/react';

export const Home = () => {
  return (
    <Layout>
      {/* logout button */}
      <button 
      className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
       onClick={() => signOut()}>
        Logout
      </button>
    </Layout>
  );
};
