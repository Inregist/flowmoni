import { Layout } from '@flowmoni/components/Layout';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { boolean, date, number, string, z } from 'zod';
import { Input, ModalInput } from '@flowmoni/components/Input';
import { PersonIcon } from '@radix-ui/react-icons';

export const newTransactionSchema = z.object({
  type: z.enum(['expense', 'income']).default('expense'),
  walletId: number().nonnegative(),
  categoryId: string().nonempty(),
  amount: number().nonnegative(),
  note: string().optional(),
  date: date().default(() => new Date()),
  paidWithWalletId: number().nonnegative().optional(),
  paidWithCategoryId: string().nonempty().optional(),
  paidWithNote: string().optional(),
  isExcludeFromReport: boolean().default(false),
});
export type NewTransactionSchema = z.infer<typeof newTransactionSchema>;

export const NewTransaction = () => {
  const {
    register,
    handleSubmit: formSubmit,
    formState: { errors },
  } = useForm<NewTransactionSchema>({
    resolver: zodResolver(newTransactionSchema),
  });
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length >= 2) router.back();
    else router.push('/transactions');
  };

  const handleSubmit = formSubmit(
    (data, e) => {
      e?.preventDefault();
      console.log(data);
    },
    (error) => {
      console.log(error);
    },
  );

  return (
    <Layout noBottom className="">
      <div className="round-t-md mb-4 flex w-full justify-between bg-white p-4 shadow-sm">
        <button type="button" className="w-8" onClick={handleBack}>
          X
        </button>
        <div className="ml-4 font-semibold">New Transaction</div>
        <button onClick={handleSubmit} className="ml-auto">
          SAVE
        </button>
      </div>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="border-t border-gray-200 shadow-md">
          <Input.InputText
            icon={<PersonIcon />}
            registerField={register('amount')}
          />
          <ModalInput.ModalInputText
            icon={<PersonIcon width={32} />}
            registerField={register('walletId')}
          />
          <Input.InputText
            icon={<PersonIcon />}
            registerField={register('categoryId')}
          />
          <Input.InputText
            icon={<PersonIcon />}
            registerField={register('note')}
          />
          <Input.InputText
            icon={<PersonIcon />}
            registerField={register('date')}
          />
        </div>

        <div className="mt-4 border-t border-gray-200 shadow-md">
          <ModalInput.ModalInputText
            icon={<PersonIcon />}
            registerField={register('paidWithWalletId')}
          />
          <Input.InputText
            icon={<PersonIcon />}
            registerField={register('paidWithCategoryId')}
          />
          <Input.InputText
            icon={<PersonIcon />}
            registerField={register('paidWithNote')}
          />
        </div>

        <div className="mt-4 border-t border-gray-200 shadow-md">
          <Input.InputText
            icon={<PersonIcon />}
            registerField={register('isExcludeFromReport')}
          />
        </div>
      </form>
    </Layout>
  );
};
