import { Layout } from '@flowmoni/components/Layout';
import * as Tabs from '@radix-ui/react-tabs';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { TransactionGroup } from '@flowmoni/components/Transaction';
import { MouseEventHandler, useEffect, useState } from 'react';

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

const scrollToCenter: MouseEventHandler<HTMLButtonElement> = (event) => {
  event.currentTarget.scrollIntoView({
    behavior: 'smooth',
    inline: 'center',
  });
};

const generateTransactionGroups = () => {
  return Array(5)
    .fill(0)
    .map((g) => ({
      date: '2021-11-01',
      transactions: Array(Math.floor(Math.random() * 5 + 1)).fill(0),
    }));
};

export const Transactions = () => {
  const [transactionGroups, setTransactionGroups] = useState<
    ReturnType<typeof generateTransactionGroups>
  >([]);

  useEffect(() => {
    setTransactionGroups(generateTransactionGroups());

    const curMon = months[new Date().getMonth()] ?? '';
    const curTab = document.getElementById(curMon);
    curTab?.click();
  }, []);

  const handleTabChange = (value: string) => {
    setTransactionGroups(generateTransactionGroups());
  };

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
            defaultValue={months[new Date().getMonth()] ?? ''}
          >
            <Tabs.List className="flex w-full flex-nowrap border-b shadow-sm">
              {months.map((month, i) => (
                <Tabs.Trigger
                  id={month}
                  className="mb-1 h-12 w-2/5 flex-shrink-0 items-center justify-center border-slate-500 data-[state=active]:border-b-2 data-[state=active]:font-bold md:w-40"
                  key={month}
                  value={month}
                  onClick={scrollToCenter}
                >
                  {month}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Tabs.Root>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex h-1 bg-slate-500/20"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="h-1 w-8 rounded-full data-[state=visible]:bg-slate-600/20 " />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>

      <ScrollArea.Root className="h-1 w-full flex-grow bg-slate-200">
        <ScrollArea.Viewport className="h-full ">
          <div className="mb-4 flex w-full flex-col items-center bg-white p-4 shadow-md">
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
