import { PersonIcon } from '@radix-ui/react-icons';
import { PropsWithChildren } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export const Field = (
  props: PropsWithChildren & {
    icon: React.ReactNode;
    registerField: UseFormRegisterReturn<string>;
  },
) => {
  const { icon, registerField } = props;

  return (
    <div className="flex items-center bg-white pl-4 py-3">
      <div className="flex h-8 w-8 items-center justify-center">{icon}</div>
      <input
        className="ml-4 h-8 grow border-b border-gray-300 bg-inherit text-lg"
        placeholder={registerField.name}
        {...registerField}
      />
    </div>
  );
};
