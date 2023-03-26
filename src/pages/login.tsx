import { Login } from '@flowmoni/features/Login/Login';
import { getServerAuthSession } from '@flowmoni/server/auth';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

const Page: FC = (props) => {
  return <Login {...props} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const sess = await getServerAuthSession(ctx);

  if (sess?.user?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Page;
