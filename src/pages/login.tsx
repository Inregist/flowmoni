import { Login } from '@flowmoni/features/Login/Login';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { FC } from 'react';

const Page: FC = (props) => {
  return <Login {...props} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const sess = await getSession(ctx);

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
