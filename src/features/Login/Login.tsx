import Link from 'next/link';
import { useState } from 'react';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(username, password);
  };

  const handleGoogleLogin = () => {
    console.log('google login');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-50">
      <img
        src={'/icon-512x512.png'}
        alt="logo"
        className="mb-6 h-32 w-32 object-cover"
      />
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <input
          name="username"
          placeholder="username"
          value={username}
          onChange={handleChange}
          className="my-1 w-64 rounded-md border border-gray-300 bg-slate-100 px-2 py-1 text-lg shadow-inner"
        />
        <input
          name="password"
          placeholder="password"
          type="password"
          value={password}
          onChange={handleChange}
          className="my-1 w-64 rounded-md border border-gray-300 bg-slate-100 px-2 py-1 text-lg shadow-inner"
        />
        <button className="mt-2 w-64 rounded-md bg-blue-500 p-2 font-medium text-white shadow-md">
          Login
        </button>
      </form>
      <div className="mt-4 mb-2 flex gap-1 text-gray-500">
        Don't have an account?
        <Link href={'/signup'} className="text-blue-600 underline">
          Sign up
        </Link>
      </div>

      <div className="my-4 flex items-center justify-center">
        <hr className="h-[2px] w-40 bg-gray-200" />
        <span className="px-4 text-gray-500">or</span>
        <hr className="h-[2px] w-40 bg-gray-200" />
      </div>

      <button
        onClick={handleGoogleLogin}
        className="flex w-64 items-center justify-start gap-2 rounded-md border border-gray-200 bg-white p-2 shadow-md"
      >
        <img src="https://http.cat/200" className="mx-3 h-4 w-4" />
        <span className="font-medium text-gray-500">Login with Google</span>
      </button>
    </div>
  );
};
