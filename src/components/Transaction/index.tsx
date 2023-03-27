import { BoxIcon } from '@radix-ui/react-icons';

export const Transaction = () => {
  return (
    <div className="flex w-full items-center justify-between px-4 py-2">
      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-400">
        <BoxIcon />
      </div>
      <div className="">
        <div>category</div>
        <div className="w-full truncate text-xs text-gray-500">
          note is very very long long long{' '}
        </div>
      </div>
      <div className="ml-auto text-right">
        <div>200</div>
      </div>
    </div>
  );
};

export const TransactionGroup = (props: {
  date: string;
  transactions: unknown[];
}) => {
  const { date } = props;

  return (
    <div className="mb-4 bg-white shadow-md">
      <div className="text-md w-full border-b border-gray-200 py-4 px-4 font-semibold">
        {date}
      </div>
      <div>
        {props.transactions.map((transaction, i) => (
          <Transaction key={i} />
        ))}
      </div>
    </div>
  );
};
