import { Transactions } from '@flowmoni/features/Transaction';
import { getServerAuthSession } from '@flowmoni/server/auth';
import { GetServerSideProps } from 'next';

const Page = () => {
  return <Transactions />;
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
