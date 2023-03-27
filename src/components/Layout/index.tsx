'use client';

import { PropsWithChildren } from 'react';
import { BottomBar } from './BottomBar';

export const Layout = (props: PropsWithChildren & { className?: string }) => {
  const { children, className } = props;

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-300">
      <div className="flex h-full w-full flex-col rounded-md border-2 border-slate-200 bg-slate-100 shadow-xl md:my-4 md:w-96">
        <div
          className={`flex flex-grow flex-col items-center justify-start ${className}`}
        >
          {children}
        </div>
        <BottomBar />
      </div>
    </div>
  );
};
