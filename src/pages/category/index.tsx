import { Category } from '@flowmoni/features/Category';
import { getServerAuthSession } from '@flowmoni/server/auth';
import { GetServerSideProps } from 'next';

const Page = () => {
  return <Category />;
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
