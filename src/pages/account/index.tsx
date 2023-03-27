import { Account } from '@flowmoni/features/Account';
import { getServerAuthSession } from '@flowmoni/server/auth';
import { GetServerSideProps } from 'next';

const Page = () => {
  return <Account />;
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
    props: {},
  };
};

export default Page;
