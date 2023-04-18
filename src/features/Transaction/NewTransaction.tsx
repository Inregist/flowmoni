import { Layout } from '@flowmoni/components/Layout';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { boolean, date, number, string, z } from 'zod';
import { Input, ModalInput } from '@flowmoni/components/Input';
import { PersonIcon } from '@radix-ui/react-icons';
import { insertTransactionSchema } from '@flowmoni/server/schema/transactions';

export type NewTransactionSchema = z.infer<typeof insertTransactionSchema>;

export const NewTransaction = () => {
  const {
    register,
    control,
    handleSubmit: formSubmit,
    formState: { errors },
    getValues,
  } = useForm<NewTransactionSchema>({
    resolver: zodResolver(insertTransactionSchema),
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
      console.log(getValues(), error);
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
          {/* <Input.InputText
            icon={<PersonIcon />}
            registerField={register('amount')}
          /> */}

          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <ModalInput.ModalAmount
                placeholder='amount'
                icon={<PersonIcon width={32} />}
                {...field}
              />
            )}
          />

          <Controller
            name="walletId"
            control={control}
            render={({ field }) => (
              <ModalInput.ModalInputText
                icon={<PersonIcon width={32} />}
                {...field}
              />
            )}
          />

          <Input.InputText
            icon={<PersonIcon />}
            placeholder='category'
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
          <Controller
            name="paidWithWalletId"
            control={control}
            render={({ field }) => (
              <ModalInput.ModalInputText icon={<PersonIcon />} {...field} />
            )}
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
