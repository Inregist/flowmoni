import { LoginProps } from '@flowmoni/features/Login';
import { Login } from '@flowmoni/features/Login/Login';

const Page = (props: LoginProps) => {
  return <Login {...props} />;
};

export default Page;
