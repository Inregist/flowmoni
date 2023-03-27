import { PersonIcon, PlusIcon, ReaderIcon } from '@radix-ui/react-icons';
import * as Tabs from '@radix-ui/react-tabs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const BottomBar = () => {
  const router = useRouter();

  const LeftMenus = [
    {
      name: 'Transactions',
      value: 'transactions',
      icon: <ReaderIcon />,
      path: '/transactions',
    },
  ];

  const RightMenus = [
    {
      name: 'Account',
      value: 'account',
      icon: <PersonIcon />,
      path: '/account',
    },
  ];

  const menus = new Map(
    [...LeftMenus, ...RightMenus].map((menu) => [menu.value, menu]),
  );

  const handleAddTransaction = () => {
    console.log('Add Transaction');
  };

  const handleTabChange = (value: string) => {
    const menu = menus.get(value);
    if (menu) {
      router.push(menu.path);
    }
  };

  const tabValue = router.pathname.split('/')[1];

  return (
    <Tabs.Root
      className=""
      defaultValue={tabValue}
      onValueChange={handleTabChange}
    >
      <Tabs.List className="flex items-center justify-between bg-white px-4 py-2">
        {LeftMenus.map((menu) => (
          <MenuItem key={menu.value} {...menu} />
        ))}
        <button
          className="rounded-full bg-green-600 p-2 text-xs text-white"
          onClick={handleAddTransaction}
        >
          <PlusIcon />
        </button>
        {RightMenus.map((menu) => (
          <MenuItem key={menu.value} {...menu} />
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
};

const MenuItem = ({ name, value, icon }: any) => {
  return (
    <Tabs.Trigger
      className="flex-1 text-xs text-slate-600 data-[state=active]:font-bold data-[state=active]:text-slate-800"
      value={value}
    >
      <div className="flex flex-col items-center justify-center">
        {icon}
        {name}
      </div>
    </Tabs.Trigger>
  );
};
