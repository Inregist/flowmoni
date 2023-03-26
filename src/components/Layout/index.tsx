import { PropsWithChildren } from 'react';
import { TopBar } from './TopBar';

export const Layout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-300">
      <div className="flex h-full w-full flex-col rounded-md border-2 border-slate-200 bg-slate-100 shadow-xl sm:my-4 sm:w-96">
        <TopBar />
        <div className="flex flex-grow flex-col items-center justify-center py-2 px-4">
          {children}
        </div>
        <div className="flex items-center justify-center rounded-b-md bg-slate-200 py-2 px-4">
          BottomBar
        </div>
      </div>
    </div>
  );
};
