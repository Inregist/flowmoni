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

const AccordionTrigger = ({ children, ...props }: PropsWithChildren) => (
  <Accordion.Header className="flex h-10 w-full items-center justify-center gap-1 bg-gray-300">
    <Accordion.Trigger className="flex w-full items-center justify-start gap-2 py-1 pl-2 text-lg font-medium">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400">
        <BoxIcon />
      </div>
      <div className="">{children}</div>
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
  const wallets = [
    { name: 'wallet1', icon: 'source' },
    { name: 'wallet2', icon: 'source2' },
    { name: 'wallet3', icon: 'source3' },
  ];

  const grouped: CategoryGroup[] = [
    {
      id: 1,
      name: 'cat1',
      level: 1,
      icon: 'cat1.png',
      parentId: 0,
      children: [
        {
          id: 1,
          name: 'cat1',
          level: 1,
          icon: 'cat1.png',
          parentId: 0,
          children: [
            { id: 1, name: 'cat1', level: 1, icon: 'cat1.png', parentId: 0 },
            { id: 1, name: 'cat1', level: 1, icon: 'cat1.png', parentId: 0 },
          ],
        },
      ],
    },
  ];

  const list = [
    {
      topic: 'topic 1',
      content: [
        {
          subTopic: 'topic 1.1',
          content: ['cont1.1- 1', 'cont1.1- 2', 'cont1.1- 3'],
        },
        {
          subTopic: 'topic 1.2',
          content: ['cont1.2- 1', 'cont1.2- 2', 'cont1.2- 3'],
        },
        {
          subTopic: 'topic 1.3',
          content: ['cont1.3- 1', 'cont1.3- 2', 'cont1.3- 3'],
        },
      ],
    },
    {
      topic: 'topic 2',
      content: [
        {
          subTopic: 'topic 2.1',
          content: ['cont2.1- 1', 'cont2.1- 2', 'cont2.1- 3'],
        },
        {
          subTopic: 'topic 1.2',
          content: ['cont2.2- 1', 'cont2.2- 2', 'cont2.2- 3'],
        },
        {
          subTopic: 'topic 2.3',
          content: ['cont2.3- 1', 'cont2.3- 2', 'cont2.3- 3'],
        },
      ],
    },
  ];

  const [isIncome, setIsIncome] = useState(true);

  return (
    <Layout className="bg-white">
      <Select.Root defaultValue={wallets[0]?.name}>
        <Select.Trigger className="m-3 flex h-10 w-32 items-center justify-between self-end rounded-l-3xl rounded-r-lg bg-gray-300">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
            <BoxIcon />
          </div>
          <Select.Value />
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
                  key={v.name}
                  value={v.name}
                  className="flex h-10 select-none items-center gap-2 px-1 data-[disable]:pointer-events-none data-[highlighted]:bg-gray-300"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-400">
                    <BoxIcon />
                    {/*v.icon*/}
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
        {list.map((lv1) => (
          <Accordion.Item value={lv1.topic}>
            <AccordionTrigger>{lv1.topic}</AccordionTrigger>
            <Accordion.Content
              className="flex w-96 overflow-hidden"
              // className="flex w-96 overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up"
            >
              <div className="w-full">
                {lv1.content.map((v) => (
                  <div key={v.subTopic} className="w-full">
                    <div className="flex w-full items-center gap-2 bg-gray-200 p-1 px-4 font-medium">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400">
                        <BoxIcon />
                      </div>
                      {v.subTopic}
                    </div>
                    {v.content.map((cv) => (
                      <div
                        key={cv}
                        className="flex w-full items-center gap-2 bg-gray-100 p-1 px-10 font-thin"
                      >
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400">
                          <BoxIcon />
                        </div>
                        {cv}
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
