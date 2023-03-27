import { Home } from '@flowmoni/features/Home';
import { getServerAuthSession } from '@flowmoni/server/auth';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

const Page: FC = () => {
  return <Home />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const sess = await getServerAuthSession(ctx);

  if (!sess?.user?.id) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: '/transactions',
      permanent: false,
    },
  };

  return {
    props: {},
  };
};

export default Page;
