import { GetServerSideProps } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';
import { FC } from 'react';

const Home: FC = () => {
  const { data, status } = useSession();

  return (
    <>
      <div>You're logged in</div>
      <button onClick={() => signOut()}>Log out</button>
      <pre>{JSON.stringify(data, null, 2) ?? "uu"}</pre>
      <pre>{JSON.stringify(status, null, 2) ?? "uu"}</pre>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const sess = await getSession(ctx);

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

export default Home;
