import { Layout } from '@flowmoni/components/Layout';
import * as Tabs from '@radix-ui/react-tabs';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import {
  Transaction,
  TransactionGroup,
} from '@flowmoni/components/Transaction';
import { useState } from 'react';

const generateTransactionGroups = () => {
  return Array(5)
    .fill(0)
    .map((g) => ({
      date: '2021-11-01',
      transactions: Array(Math.floor(Math.random() * 5 + 1))
        .fill(0)
        .map((t) => ({})),
    }));
};

export const Transactions = () => {
  const [transactionGroups, setTransactionGroups] = useState(
    generateTransactionGroups(),
  );

  const handleTabChange = (value: string) => {
    console.log('Tab Change', value);
    setTransactionGroups(generateTransactionGroups());
  };

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return (
    <Layout className="bg-white">
      <div className="flex flex-col items-center justify-between px-4 py-2">
        <div>Balance</div>
        <div>2000</div>
      </div>
      <ScrollArea.Root className="w-full">
        <ScrollArea.Viewport className="w-full overflow-x-auto">
          <Tabs.Root
            onValueChange={handleTabChange}
            className="h-12 w-full border-b border-gray-300 shadow-sm"
            defaultValue="Nov"
          >
            <Tabs.List className="flex flex-nowrap border-b  shadow-sm">
              {months.map((month, i) => (
                <Tabs.Trigger
                  className="mb-1 h-12 w-16 items-center justify-center border-slate-500 data-[state=active]:border-b-2"
                  key={month}
                  value={month}
                >
                  {month}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Tabs.Root>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="horizontal"></ScrollArea.Scrollbar>
      </ScrollArea.Root>

      <ScrollArea.Root className="h-1 w-full flex-grow bg-slate-200">
        <ScrollArea.Viewport className="h-full ">
          <div className="mb-4 flex w-full flex-col items-center bg-white p-4 shadow-md">
            <div>Transaction Header</div>

            <button className="mt-2 w-64 rounded-full bg-green-500/20 p-2 font-semibold text-green-600">
              View Report
            </button>
          </div>

          {transactionGroups.map((group, i) => (
            <TransactionGroup key={i} {...group} />
          ))}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </Layout>
  );
};
