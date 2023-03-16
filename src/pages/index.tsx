import { GetStaticProps } from 'next';
import { FC } from 'react';

const Home: FC = () => {
  return <></>;
};

export const getStaticProps: GetStaticProps = async (_) => {
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
};

export default Home;
