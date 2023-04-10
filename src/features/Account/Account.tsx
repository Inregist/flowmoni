import { Layout } from '@flowmoni/components/Layout';
import { signOut } from 'next-auth/react';
import { BoxIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

export const Account = () => {
  const [logoutBtn, setLogoutBtn] = useState(false);
  const [otherAcc, setOtherAcc] = useState(false);

  return (
    <Layout>
      <div
        className="group my-4 flex w-full items-center justify-between px-6"
        onDrag={() => setLogoutBtn(true)}
      >
        <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-400">
          <BoxIcon />
        </div>
        <div className="mr-auto h-full w-auto items-center p-2">
          <div className="text-xl font-medium">UserName</div>
          <div className="text-gray-500">xyuzsjdkl@mail.com</div>
        </div>
        {logoutBtn ? (
          <button
            className="flex h-full w-24
           items-center justify-center bg-red-500 text-gray-200"
            onClick={() => setLogoutBtn(false)}
          >
            Logout
          </button>
        ) : (
          ''
        )}
      </div>
      <hr className=" mb-4 h-[2px] w-5/6 bg-gray-100" />

      {otherAcc ? (
        <div className="group mb-4 flex w-full items-center justify-between px-6">
          <div className="ml-1 mr-5 flex h-12 w-12 items-center justify-center rounded-full bg-gray-400">
            <BoxIcon />
          </div>
          <div className="mr-auto h-full w-auto items-center p-2">
            <div className="text-lg font-medium">UserName1</div>
            <div className="text-sm text-gray-500">x1242@mail.com</div>
          </div>
        </div>
      ) : (
        ''
      )}

      <button
        className="rounded bg-slate-500 py-2 px-4 font-bold text-white hover:bg-slate-700"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </Layout>
  );
};
