import { Layout } from '@flowmoni/components/Layout';
import {
  BoxIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from '@radix-ui/react-icons';
import * as Accordion from '@radix-ui/react-accordion';
import * as Select from '@radix-ui/react-select';
import React, { PropsWithChildren } from 'react';
import { useState } from 'react';
import { CategoryGroup } from '@flowmoni/server/api/routers/category';
import { Wallet } from '@flowmoni/server/schema';
import { WalletEnum } from '@flowmoni/server/schema/wallets';

const AccordionTrigger = ({ children, ...props }: PropsWithChildren) => (
  <Accordion.Header className="flex h-10 w-full items-center justify-center gap-1 bg-gray-300">
    <Accordion.Trigger className="flex w-full items-center justify-start gap-2 py-1 pl-2 text-lg font-medium">
      {children}
    </Accordion.Trigger>
    <Accordion.Trigger
      className="flex items-center justify-center p-2 transition-transform data-[state=open]:rotate-180"
      {...props}
    >
      <ChevronDownIcon className="flex h-5 w-5" aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
);

export const Category = () => {
  const wallets: Wallet[] = [
    {
      id: 0,
      name: 'wallet1',
      currency: 'USD',
      balance: 0,
      type: 'WalletEnum',
      icon: './asset/cat1.png',
      templateId: 0,
    },
    {
      id: 1,
      name: 'wallet2',
      currency: 'USD',
      balance: 0,
      type: 'WalletEnum',
      icon: './asset/cat1.png',
      templateId: 0,
    },
    {
      id: 2,
      name: 'wallet3',
      currency: 'USD',
      balance: 0,
      type: 'WalletEnum',
      icon: './asset/cat1.png',
      templateId: 0,
    },
  ];

  const grouped: CategoryGroup[] = [
    {
      id: 0,
      name: 'cat1',
      level: 1,
      icon: './asset/cat1.png',
      parentId: null,
      children: [
        {
          id: 1,
          name: 'cat1.1',
          level: 2,
          icon: './asset/cat1.png',
          parentId: 0,
          children: [
            {
              id: 2,
              name: 'cat1.1.1',
              level: 3,
              icon: './asset/cat1.png',
              parentId: 1,
            },
            {
              id: 3,
              name: 'cat1.1.2',
              level: 3,
              icon: 'cat1.png',
              parentId: 1,
            },
          ],
        },
      ],
    },
  ];

  const [isIncome, setIsIncome] = useState(true);
  const [wallet, setWallet] = useState(wallets[0]);
  
  return (
    <Layout className="bg-white">
      <Select.Root
        defaultValue={wallets[0]?.name}
        onValueChange={(v) => {
          setWallet(wallets.find((w) => w.id.toString() === v));
        }}
      >
        <Select.Trigger className="m-3 flex h-10 w-32 flex-row items-center justify-between self-end rounded-l-3xl rounded-r-lg bg-gray-300">
          <div className="h-10 w-10 items-center justify-center rounded-full bg-gray-400">
            {wallet?.icon ? (
              <img src={wallet?.icon} className="rounded-full" />
            ) : (
              <BoxIcon />
            )}
          </div>
          <Select.Value>{wallet?.name}</Select.Value>
          <Select.Icon className="flex items-center justify-center">
            <ChevronDownIcon className="h-5 w-5" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal className="flex w-40 rounded-lg px-2">
          <Select.Content className="overflow-hidden bg-slate-200">
            <Select.ScrollUpButton className="">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-1">
              {wallets.map((v) => (
                <Select.Item
                  key={v.id}
                  value={v.id.toString()}
                  className="flex h-10 select-none items-center gap-2 px-1 data-[disable]:pointer-events-none data-[highlighted]:bg-gray-300"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-400">
                    {v.icon ? (
                      <img src={v.icon} className="rounded-full" />
                    ) : (
                      <BoxIcon />
                    )}
                  </div>
                  <Select.ItemText>{v.name}</Select.ItemText>
                  <Select.ItemIndicator className="flex w-full justify-end">
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton />
            <Select.Arrow />
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <div className="mb-4 flex h-10 w-full items-center justify-center bg-gray-300">
        <button
          className={isIncome ? 'text-black' : 'text-gray-500'}
          onClick={() => setIsIncome(true)}
        >
          Income
        </button>
        <hr className="mx-6 h-6 w-[1px] bg-gray-500" />
        <button
          className={!isIncome ? 'text-black' : 'text-gray-500'}
          onClick={() => setIsIncome(false)}
        >
          Expense
        </button>
      </div>

      <Accordion.Root
        type="single"
        defaultValue="0"
        className="flex w-96 flex-col"
        collapsible
      >
        {grouped.map((lv1) => (
          <Accordion.Item value={lv1.name}>
            <AccordionTrigger>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400">
                {lv1.icon ? (
                  <img src={lv1.icon} className="rounded-full" />
                ) : (
                  <BoxIcon />
                )}
              </div>
              {lv1.name}
            </AccordionTrigger>
            <Accordion.Content
              className="flex w-96 overflow-hidden"
              // className="flex w-96 overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up"
            >
              <div className="w-full">
                {lv1.children?.map((v) => (
                  <div key={v.name} className="w-full">
                    <div className="flex w-full items-center gap-2 bg-gray-200 p-1 px-4 font-medium">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400">
                        {/* {v.icon} */}
                        {v.icon ? (
                          <img src={v.icon} className="rounded-full" />
                        ) : (
                          <BoxIcon />
                        )}
                      </div>
                      {v.name}
                    </div>
                    {v.children?.map((cv) => (
                      <div
                        key={cv.name}
                        className="flex w-full items-center gap-2 bg-gray-100 p-1 px-10 font-thin"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400">
                          {cv.icon ? (
                            <img src={cv.icon} className="rounded-full" />
                          ) : (
                            <BoxIcon />
                          )}
                        </div>
                        {cv.name}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Layout>
  );
};
