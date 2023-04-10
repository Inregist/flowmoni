import { ModalInputProps } from '.';
import * as Dialog from '@radix-ui/react-dialog';
import { BaseFieldInput } from './BaseFieldInput';
import { useEffect, useState } from 'react';

export const _BaseModalInput = (props: ModalInputProps) => {
  const { icon, children, placeholder, onChange } = props;

  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const layoutEl = document.body;
    setContainer(layoutEl);
  }, []);

  return (
    <Dialog.Root>
      <Dialog.Trigger className="w-full">
        <BaseFieldInput {...props}>
          <div className="h-8 w-full grow border-b border-gray-300 bg-inherit text-left text-lg text-gray-400">
            modal
          </div>
        </BaseFieldInput>
      </Dialog.Trigger>
      <Dialog.Portal container={container}>
        <Dialog.Overlay className="absolute inset-0 bg-gray-600/10" />
        <Dialog.Content className="absolute inset-0 flex flex-col rounded-md border border-slate-200 bg-slate-100 md:inset-y-4 md:left-[calc(50%-12rem)] md:w-96">
          <div className="round-t-md mb-4 flex w-full justify-between bg-white p-4 shadow-sm ">
            <Dialog.Close className="w-8">X</Dialog.Close>
            <div className="ml-4 mr-auto font-semibold">Modal of something</div>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
