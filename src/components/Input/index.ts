import { UseFormRegisterReturn } from 'react-hook-form';
import { Text } from './Text';
import { PropsWithChildren } from 'react';
import { ModalTextArea } from './ModalTextArea';

export type CommonInputProps = PropsWithChildren & {
  registerField: UseFormRegisterReturn<string>;
  icon?: React.ReactNode;
  placeholder?: string;
};

export const Input = {
  InputText: Text,
};

export const ModalInput = {
  ModalInputText: ModalTextArea,
};
